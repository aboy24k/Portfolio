---
title: Articulated robotic and prosthetic hand
summary: A jointed hand designed in Inventor around finger linkage kinematics, with a six-actuator plan, a KiCad power schematic, and Dactyl, a browser app that tracks a real hand and streams servo angles to an Arduino.
context: Independent project
period: July 2026 to present
order: 2
tags:
  - Autodesk Inventor
  - Kinematics
  - Python
  - KiCAD
  - Power Circuitry
  - Arduino
alsoUses:
  - Motion Tracking
  - Linkage Design
  - Circuit Design
  - Mechatronics
  - Multi-actuator Design
  - Actuators
cover: images/hand-cad.jpg
coverAlt: The Autodesk Inventor model of the robotic hand, a flat palm body with finger linkages and sketch dimensions
caption: palm and finger linkage, in Inventor
links:
  - label: Launch Dactyl (hand tracking)
    url: dactyl.html
  - label: Download the arm firmware (.ino)
    url: downloads/arm_receiver.ino
---

## Where it stands

The mechanical design is about 80% complete in Autodesk Inventor. The physical prototype is the next step, so this page shows the CAD, the electrical plan and the control software rather than a finished hand.

## What I built

An articulated hand that covers mechanics, electronics, and software in one design.

- **Mechanical.** About 80% of the design is done in Autodesk Inventor: finger-joint linkages, assemblies, and joint kinematics refined for realistic articulation.
- **Electrical.** A six-actuator system, planned with a power-distribution schematic and circuit layout drawn in KiCad.
- **Software.** Python motion-tracking control code that processes sensor inputs and commands multi-joint articulation, still in development. Dactyl, below, is the hand-tracking app.

## Dactyl: hand tracking in the browser

Dactyl turns a webcam into a controller for servo-driven hands and arms. It runs in the browser, so there is nothing to install: open it, allow the camera, connect the Arduino, and move your hand.

- **Tracking.** MediaPipe's Hand Landmarker finds the hand in the camera image. Finger curl comes from the joint angles, and wrist roll, pitch and yaw come from the plane of the palm.
- **Signal conditioning.** Each value is calibrated, normalised, smoothed with a One Euro filter, mapped to a servo angle, and held to a speed limit.
- **11 channels.** Five fingers, three wrist axes, and arm swing, lift and reach. Any channel can be switched off, reversed or re-ranged to match the hardware.
- **Test tools.** A signal generator drives the arm without a camera, and a recorder saves every channel's tracked value and servo angle to a CSV file.

Dactyl needs a webcam and a Chromium browser such as Chrome or Edge, because it talks to the Arduino over Web Serial.

## The firmware

An Arduino sketch receives the angles over USB serial and drives up to 16 hobby servos through a PCA9685 board. It is written to be safe to run on a printed arm.

- **Clamped travel.** Every channel is limited to a safe range set per joint.
- **Speed limit.** Motion is capped at 300 degrees per second, so a jumpy camera frame cannot slam a joint.
- **Failsafe.** If no valid frame arrives for 500 ms, the arm stops following and holds its last position.

| Command | Meaning |
| --- | --- |
| `S,a0,…,a10` | Target angles in degrees (0 to 180), one per channel |
| `R` | Release: stop sending pulses so the servos go limp |
| `H` | Hold: resume at the last commanded position |
| `P` | Ping, answered with `PONG` |

The serial link runs at 115200 baud, one newline-terminated command per line. The firmware download is in the buttons below.

## Next

Print and assemble the physical prototype, then test the linkages under load.
