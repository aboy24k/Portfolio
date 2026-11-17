/*
  Dactyl arm receiver
  -------------------
  Receives servo angles from the Dactyl web app over USB serial and drives
  up to 16 hobby servos through a PCA9685 board.

  Boards:   Arduino Uno / Nano / Mega, or ESP32 (default I2C pins)
  Library:  "Adafruit PWM Servo Driver Library" (Library Manager)

  Wiring:
    PCA9685 SDA -> board SDA (Uno/Nano: A4)
    PCA9685 SCL -> board SCL (Uno/Nano: A5)
    PCA9685 VCC -> board 5V / 3.3V (logic power only)
    PCA9685 V+  -> external 5-6 V servo supply, rated for the total stall
                   current of your servos. Never power servos from the board.
    Grounds of the board, PCA9685 and servo supply must all be connected.

  Serial protocol (115200 baud, one command per line, newline terminated):
    S,a0,a1,...,a10   target angles in degrees (0-180), one per channel
    R                 release: stop sending pulses (servos go limp)
    H                 hold: resume pulses at the last commanded position
    P                 ping, replies "PONG"

  Channel order (must match the Dactyl channel list):
    0 thumb  1 index  2 middle  3 ring  4 pinky
    5 wrist roll  6 wrist pitch  7 wrist yaw
    8 arm swing   9 arm lift    10 arm reach
*/

#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

// ---------- Settings you will want to edit ----------
#define NUM_CH             11
#define BAUD               115200
#define PULSE_MIN_US       500      // pulse width at 0 degrees   (tune per servo)
#define PULSE_MAX_US       2500     // pulse width at 180 degrees (tune per servo)
#define MAX_DPS            300.0f   // firmware speed limit, degrees per second
#define TIMEOUT_MS         500      // no valid frame for this long -> failsafe
#define RELEASE_ON_TIMEOUT false    // false = hold last position, true = go limp

// Safe travel for each channel. Set these to what YOUR printed arm can do
// without hitting a mechanical stop. Frames are clamped to this range.
const float LIM_MIN[NUM_CH]   = {   0,   0,   0,   0,   0,    0,   0,   0,    0,   0,   0 };
const float LIM_MAX[NUM_CH]   = { 180, 180, 180, 180, 180,  180, 180, 180,  180, 180, 180 };
// Where each servo goes at power-up (fingers open, everything else centred).
const float START_POS[NUM_CH] = {   0,   0,   0,   0,   0,   90,  90,  90,   90,  90,  90 };
// -----------------------------------------------------

Adafruit_PWMServoDriver pwm(0x40);

float cur[NUM_CH];
float tgt[NUM_CH];
bool  released = false;
bool  failsafe = false;
unsigned long lastRx = 0;
unsigned long lastStep = 0;

char lineBuf[128];
uint8_t lineLen = 0;

void writeServo(uint8_t ch, float deg) {
  deg = constrain(deg, 0.0f, 180.0f);
  float us = PULSE_MIN_US + (deg / 180.0f) * (PULSE_MAX_US - PULSE_MIN_US);
  pwm.writeMicroseconds(ch, (uint16_t)us);
}

void releaseAll() {
  for (uint8_t i = 0; i < NUM_CH; i++) pwm.setPWM(i, 0, 4096);  // full off
  released = true;
}

void handleLine(char* line) {
  if (line[0] == 'S' && line[1] == ',') {
    float v[NUM_CH];
    char* p = line + 2;
    for (uint8_t i = 0; i < NUM_CH; i++) {
      char* end;
      v[i] = (float)strtod(p, &end);
      if (end == p) return;               // malformed frame: ignore all of it
      p = end;
      if (*p == ',') p++;
    }
    for (uint8_t i = 0; i < NUM_CH; i++) tgt[i] = constrain(v[i], LIM_MIN[i], LIM_MAX[i]);
    lastRx = millis();
    failsafe = false;
  } else if (line[0] == 'R') {
    releaseAll();
    Serial.println(F("RELEASED"));
  } else if (line[0] == 'H') {
    released = false;
    for (uint8_t i = 0; i < NUM_CH; i++) writeServo(i, cur[i]);
    Serial.println(F("HOLDING"));
  } else if (line[0] == 'P') {
    Serial.println(F("PONG"));
  }
}

void setup() {
  Serial.begin(BAUD);
  Wire.begin();
  pwm.begin();
  pwm.setOscillatorFrequency(27000000);   // typical PCA9685 clock; adjust if servos drift
  pwm.setPWMFreq(50);                     // 50 Hz for analog servos
  delay(10);

  for (uint8_t i = 0; i < NUM_CH; i++) {
    cur[i] = tgt[i] = START_POS[i];
    writeServo(i, cur[i]);
  }
  lastRx = lastStep = millis();
  Serial.println(F("Dactyl arm ready"));
}

void loop() {
  // 1. Read serial into a line buffer
  while (Serial.available()) {
    char c = (char)Serial.read();
    if (c == '\n' || c == '\r') {
      if (lineLen > 0) {
        lineBuf[lineLen] = 0;
        handleLine(lineBuf);
        lineLen = 0;
      }
    } else if (lineLen < sizeof(lineBuf) - 1) {
      lineBuf[lineLen++] = c;
    } else {
      lineLen = 0;                        // overflow: drop the line
    }
  }

  // 2. Failsafe if the computer stops talking
  if (!failsafe && millis() - lastRx > TIMEOUT_MS) {
    failsafe = true;
    if (RELEASE_ON_TIMEOUT) releaseAll();
    // otherwise targets stay where they are and the arm simply holds
  }

  // 3. Move every servo toward its target, limited to MAX_DPS
  unsigned long now = millis();
  if (now - lastStep >= 10) {
    float dt = (now - lastStep) / 1000.0f;
    lastStep = now;
    float maxStep = MAX_DPS * dt;
    for (uint8_t i = 0; i < NUM_CH; i++) {
      float d = tgt[i] - cur[i];
      cur[i] += constrain(d, -maxStep, maxStep);
      if (!released) writeServo(i, cur[i]);
    }
  }
}
