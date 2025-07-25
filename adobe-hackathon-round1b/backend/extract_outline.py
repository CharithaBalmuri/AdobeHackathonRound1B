



import fitz
import json

INPUT_PDF = "../frontend/sample.pdf"
OUTPUT_JSON = "../frontend/headings.json"

def extract_headings(pdf_path):
    doc = fitz.open(pdf_path)
    headings = []
    seen = set()

    for page_num in range(len(doc)):
        page = doc[page_num]
        blocks = page.get_text("dict")["blocks"]

        for block in blocks:
            if "lines" not in block:
                continue
            for line in block["lines"]:
                line_text = " ".join([span["text"] for span in line["spans"]]).strip()
                if not line_text or len(line_text) < 4:
                    continue
                font_size = max(span["size"] for span in line["spans"])

                print(f"Page {page_num+1} | '{line_text}' | Size: {font_size}")

                # Relaxed heuristic: font size >= 10.5, short text, uppercase or titlecase
                if (
                    font_size >= 10.5 and
                    len(line_text) <= 60 and
                    (line_text.isupper() or line_text.istitle())
                ):
                    if line_text not in seen:
                        headings.append({
                            "text": line_text,
                            "page": page_num + 1
                        })
                        seen.add(line_text)

    return headings

if __name__ == "__main__":
    data = extract_headings(INPUT_PDF)
    print(f"Extracted {len(data)} headings")
    with open(OUTPUT_JSON, "w") as f:
        json.dump(data, f, indent=2)




# import fitz
# import json

# INPUT_PDF = "../frontend/sample.pdf"
# OUTPUT_JSON = "../frontend/headings.json"

# def is_bold_flag(flags):
#     return (flags & 1) == 1

# def line_is_bold(line):
#     return any(is_bold_flag(span["flags"]) for span in line["spans"])

# def extract_headings(pdf_path):
#     doc = fitz.open(pdf_path)
#     headings = []
#     seen = set()

#     for page_num in range(len(doc)):
#         page = doc[page_num]
#         blocks = page.get_text("dict")["blocks"]

#         for block in blocks:
#             if "lines" not in block:
#                 continue
#             for line in block["lines"]:
#                 line_text = " ".join([span["text"] for span in line["spans"]]).strip()
#                 if not line_text or len(line_text) < 4:
#                     continue
#                 font_size = max(span["size"] for span in line["spans"])
#                 flags_list = [span["flags"] for span in line["spans"]]

#                 print(f"Page {page_num+1} | '{line_text}' | Size: {font_size} | Flags: {flags_list}")

#                 # Remove bold check temporarily
#                 if font_size >= 10 and len(line_text) <= 70:
#                     if line_text not in seen:
#                         headings.append({
#                             "text": line_text,
#                             "page": page_num + 1
#                         })
#                         seen.add(line_text)

#     return headings



# if __name__ == "__main__":
#     data = extract_headings(INPUT_PDF)
#     print(f"Extracted {len(data)} headings")
#     with open(OUTPUT_JSON, "w") as f:
#         json.dump(data, f, indent=2)