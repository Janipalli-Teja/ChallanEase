import sys
import easyocr
import json

# Get image path from command line argument
if len(sys.argv) < 2:
    print(json.dumps({"error": "No image path provided"}))
    sys.exit(1)

image_path = sys.argv[1]

# Initialize EasyOCR
reader = easyocr.Reader(['en'], gpu=False, verbose=False)
text_results = reader.readtext(image_path)

# Extract text and return as JSON
extracted_texts = [text[1] for text in text_results]
print(json.dumps(extracted_texts))
