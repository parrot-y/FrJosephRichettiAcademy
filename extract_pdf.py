#!/usr/bin/env python3

import PyPDF2
import sys
import os

def extract_pdf_text(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''
            for page_num, page in enumerate(reader.pages):
                page_text = page.extract_text()
                text += f"--- Page {page_num + 1} ---\n"
                text += page_text + '\n\n'
            return text
    except Exception as e:
        return f"Error reading PDF: {e}"

if __name__ == "__main__":
    pdf_files = [
        "PDF/HISTORY OF THE SCHOOL final draft (1).pdf",
        "PDF/consent forms forimmunizatuion.pdf"
    ]
    
    for pdf_file in pdf_files:
        if os.path.exists(pdf_file):
            print(f"\n{'='*50}")
            print(f"EXTRACTING: {pdf_file}")
            print(f"{'='*50}")
            text = extract_pdf_text(pdf_file)
            print(text)
        else:
            print(f"File not found: {pdf_file}")
