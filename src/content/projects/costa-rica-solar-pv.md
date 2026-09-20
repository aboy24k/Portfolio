---
title: Off-grid community solar PV system
summary: Load profiles, irradiance data, and LTspice simulation behind a standardized solar design for a Costa Rica mission.
context: Costa Rica mission
order: 3
tags:
  - LTspice
  - Solar Load Profiling
  - Circuit Design
  - Project Management
alsoUses:
  - PV Solar Systems
# PHOTO: put an image in public/images/ and point to it here.
# cover: images/costa-rica-solar.jpg
coverAlt: Solar panels at a community site in Costa Rica
caption: Costa Rica, field conditions
---

<!-- TODO: add site photos, the schematic, and the load numbers you are comfortable sharing. -->

## What I built

The engineering behind an off-grid solar system for a community in Costa Rica, designed so the same layout can be repeated at other sites.

- **Load profiling.** Calculated power load profiles for the community's needs.
- **Solar resource.** Worked with solar irradiance data for tropical field conditions.
- **Simulation.** Modeled circuit behavior in LTspice before anything was built.
- **Replication.** Drafted standardized system schematics so the design is modular and repeatable.

## Field notes: how the two datasets meet

The load profile and the irradiance data feed the same basic sizing relationship:

`array size (kW) ≈ daily load (kWh/day) ÷ (peak sun hours × system efficiency)`

Simulation then checks that the circuit behaves before hardware is committed.
