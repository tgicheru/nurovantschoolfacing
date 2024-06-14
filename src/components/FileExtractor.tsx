import React, { useState, ChangeEvent } from "react";
import JSZip from "jszip";
import pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const FileExtractor: React.FC = () => {
  const [fileText, setFileText] = useState<string>("");

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("No file selected");
      return;
    }

    if (
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      alert("Please upload a valid .pdf or .docx file");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds the limit of 10MB");
      return;
    }

    try {
      if (file.type === "application/pdf") {
        await extractTextFromPdf(file);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        await extractTextFromDocx(file);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      alert("An error occurred while processing the file. Please try again.");
    }
  };

  const extractTextFromPdf = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        let text = "";
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();

          //           const text = textContent.items
          //   .filter(item => 'str' in item)
          //   .map(item => item.str)
          //   .join(' ') + '\n';
          textContent.items.forEach((item) => {
            if ("str" in item) {
              text += item.str + " ";
            }
          });
          text += "\n";
        }
        setFileText(text);
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const extractTextFromDocx = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const zip = new JSZip();
        const content = await zip.loadAsync(arrayBuffer);
        const doc = await content.file("word/document.xml")?.async("text");
        if (!doc) throw new Error("Document XML not found");

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(doc, "application/xml");
        const paragraphs = xmlDoc.getElementsByTagName("w:p");
        let text = "";
        for (let i = 0; i < paragraphs.length; i++) {
          const nodes = paragraphs[i].getElementsByTagName("w:t");
          for (let j = 0; j < nodes.length; j++) {
            text += nodes[j].textContent;
          }
          text += "\n";
        }
        setFileText(text);
      } catch (error) {
        console.error("Error extracting text from DOCX:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".pdf, .docx" onChange={handleFileUpload} />
      <textarea value={fileText} readOnly rows={20} cols={80}></textarea>
    </div>
  );
};

export default FileExtractor;
