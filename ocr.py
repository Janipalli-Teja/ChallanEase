import sys
import easyocr
import json

image_path = "./image/re.png"

# Initialize EasyOCR without verbose output
reader = easyocr.Reader(['en'], gpu=False, verbose=False)
text_results = reader.readtext(image_path)

extracted_texts = [text[1] for text in text_results]
print(json.dumps(extracted_texts))
