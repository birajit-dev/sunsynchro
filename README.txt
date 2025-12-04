
Sunsynchro Calculator — Bengali + Tripura defaults
Files:
- calculator.html        (localized Bengali UI, Tripura defaults, auto-resize via postMessage)
- embed-example.html     (host page example that demonstrates using postMessage to auto-resize)
Instructions:
1. Upload both files to the same directory on your web server (e.g., https://sunsynchro.com/calculator.html)
2. Use the iframe snippet on your pages to embed the calculator:
   <iframe data-sunsynchro src="https://sunsynchro.com/calculator.html" style="width:100%;max-width:760px;height:500px;border:0;border-radius:12px;" loading="lazy"></iframe>
3. Add the host listener script shown in embed-example.html to allow automatic height resizing.
