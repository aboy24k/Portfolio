---
title: ABET Canvas scores updater
summary: A Python desktop app that pulls ABET outcome (SO1 to SO7) scores out of Canvas, maps students to academic plans, and writes the results to a Google Sheet.
context: Accreditation reporting tool
order: 5
tags:
  - Python
  - Pandas
  - Tkinter
  - Canvas API
  - Google Sheets API
alsoUses:
  - REST APIs
cover: images/abet-updater-flow.svg
coverAlt: Diagram showing Canvas assignments flowing through a Python app into a Google Sheet
caption: Canvas to Google Sheet, automatically
# Add a real screenshot of the app window later, e.g. in the body below:
# ![The updater window](../../assets/projects/abet/window.png)
---

## What it does

The ABET Canvas Scores Updater gathers student performance data tied to ABET student outcomes SO1 to SO7. It reads assignment scores from Canvas, works out each student's academic plan (for example BSEE or BSME) from university-maintained records, and writes a clean table to a shared Google Sheet used for accreditation tracking and curriculum assessment.

The goals were to:

1. Automate collecting ABET-relevant assignment data from Canvas.
2. Map student IDs to academic plans using university-maintained spreadsheets.
3. Extract and organize the outcomes-based performance data.
4. Upload the result to one central sheet for department use.

## How a run works

1. **Check the token.** The user pastes a Canvas API token into a masked field, and the app confirms it works before doing anything else.
2. **Map IDs to plans.** It reads a private, read-only Google Sheet that lists each student's SIS ID and academic plan. A student without a match is labeled "Unknown".
3. **Find the outcome assignments.** It pulls the user's active courses, following Canvas's paginated responses, and keeps the assignments whose titles contain an outcome code from SO1 to SO7.
4. **Collect submissions.** For each match it fetches the submissions and keeps the score, grade, course, term, assignment title and outcome.
5. **Publish.** It writes the table to a tab called ABET Scores, replacing what was there.

## The interface

A small Tkinter window: a masked token field, a Run Update button, and a live log. A custom logging handler streams every message into the log box, and the work runs on a background thread so the window stays responsive. Failures show up as a message box and a line in the log. The script can be packaged with PyInstaller into an executable, so people without a Python setup can run it.

## The core of it

Outcome codes are found with a regular expression on the assignment title:

```python
def extract_abet_outcome(title):
    match = re.search(r'\bSO[1-7]\b', title.upper())
    return match.group(0) if match else None
```

Each submission becomes one row:

```python
all_data.append({
    "Academic Plan": acad_plan,
    "Assignment": assignment.get("name"),
    "Score": submission.get("score", "Not Submitted"),
    "Grade": submission.get("grade", "N/A"),
    "Course ID": course_id,
    "Course Name": course_name,
    "Term": term_name,
    "ABET Outcome": abet_outcome,
})
```

## What it is built with

| Technology | Role |
| --- | --- |
| Python 3 | Core language |
| Tkinter | Desktop window |
| Requests | REST calls to the Canvas API |
| Pandas | Cleaning and shaping the data |
| gspread | Reading and writing Google Sheets |
| Google OAuth2 | Service account sign-in |
| logging | Live log display in the window |
| PyInstaller | Optional standalone executable |

The student ID to academic plan lookup comes from IT Services, who provide the IDs and plans the mapping needs.
