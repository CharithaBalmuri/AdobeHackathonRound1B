# SmartPDFReader - Adobe Hackathon Round 2

This project reads a PDF file and extracts all the heading titles (also called the outline or bookmarks) using Python. These headings are shown on a webpage using PDF.js.

 <!-- Folder Structure -->

- `backend/extract_outline.py`: Python file to extract headings from the PDF.
- `frontend/index.html`: Main page that shows the PDF and the headings.
- `frontend/script.js`: Loads headings from JSON and connects them to the PDF.
- `frontend/sample.pdf`: The PDF file used.
- `frontend/headings.json`: File where Python stores the heading data.
- `Dockerfile`: (Optional) Used for testing the code using Docker.
- `README.md`: This file.

<!-- How to Run the Project (Without Docker) -->

1. Open the `backend` folder.
2. Run this Python command:

```bash
python extract_outline.py
```
