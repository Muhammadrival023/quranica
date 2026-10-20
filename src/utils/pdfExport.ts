/**
 * Utilitas Ekspor Dokumen Kajian Fiqh, Tafsir, & Deep Research ke PDF
 * Menghasilkan tampilan cetak dokumen akademis elegan berstandar jurnal ilmiah
 */

export interface PdfExportOptions {
  title: string;
  topic?: string;
  content: string;
  author?: string;
  mode?: string;
  tier?: string;
  sourceDriveUrl?: string;
}

export function exportDocumentToPdf(options: PdfExportOptions): void {
  const {
    title,
    topic = "Kajian Fiqh & Tafsir Ahkam",
    content,
    author = "Lembaga Riset Turats & Fiqh Islam - Quranica AI",
    mode = "Tafsir & Fiqh Ahkam",
    sourceDriveUrl = "https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq"
  } = options;

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Mohon izinkan pop-up browser untuk mengunduh berkas PDF.");
    return;
  }

  // Format markdown sederhana ke HTML bersih untuk cetak
  const formattedHtml = content
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 15pt; font-weight: bold; color: #064e3b; margin-top: 18px; margin-bottom: 8px; border-bottom: 1px solid #d1fae5; padding-bottom: 4px;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 18pt; font-weight: bold; color: #047857; margin-top: 24px; margin-bottom: 10px; border-bottom: 2px solid #10b981; padding-bottom: 6px;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 22pt; font-weight: 800; color: #064e3b; margin-top: 28px; margin-bottom: 14px; text-align: center;">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #0f172a;">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^\> (.*$)/gim, '<blockquote style="border-left: 4px solid #10b981; background: #f0fdf4; padding: 10px 16px; margin: 12px 0; color: #166534; font-style: italic; border-radius: 0 8px 8px 0;">$1</blockquote>')
    .replace(/```([\s\S]*?)```/gim, '<pre style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; overflow-x: auto; font-family: monospace; font-size: 10pt;"><code>$1</code></pre>')
    .replace(/\n\n/gim, '</p><p style="margin-bottom: 12px; line-height: 1.7; text-align: justify;">')
    .replace(/\n/gim, '<br/>');

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const htmlDocument = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${title} - Dokumen Riset Quranica</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    
    @page {
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
      @bottom-right {
        content: counter(page);
      }
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      line-height: 1.7;
      font-size: 11pt;
      margin: 0;
      padding: 20px;
      background: #ffffff;
    }

    .arabic-text {
      font-family: 'Amiri', 'Traditional Arabic', serif;
      direction: rtl;
      font-size: 16pt;
      line-height: 2.2;
      color: #064e3b;
      text-align: right;
      margin: 12px 0;
      background: #f0fdf4;
      padding: 10px 16px;
      border-radius: 8px;
      border-right: 4px solid #10b981;
    }

    .document-header {
      text-align: center;
      border-bottom: 3px double #10b981;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }

    .bismillah {
      font-family: 'Amiri', serif;
      font-size: 20pt;
      color: #047857;
      margin-bottom: 8px;
    }

    .instansi-title {
      font-size: 12pt;
      font-weight: 700;
      color: #065f46;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin: 0;
    }

    .instansi-sub {
      font-size: 9pt;
      color: #64748b;
      margin-top: 2px;
    }

    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 24px;
      font-size: 9.5pt;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .meta-item strong {
      color: #334155;
    }

    .main-title {
      font-size: 18pt;
      font-weight: 800;
      color: #0f172a;
      text-align: center;
      margin: 16px 0 24px 0;
      line-height: 1.3;
    }

    .content-body {
      text-align: justify;
    }

    .content-body p {
      margin-bottom: 12px;
      line-height: 1.7;
    }

    .footer-stamp {
      margin-top: 40px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      font-size: 8.5pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 55pt;
      font-weight: 800;
      color: rgba(16, 185, 129, 0.04);
      z-index: -1;
      pointer-events: none;
      white-space: nowrap;
      text-transform: uppercase;
    }

    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
      a {
        text-decoration: none;
        color: #047857;
      }
    }
  </style>
</head>
<body>
  <div class="watermark">QURANICA ACADEMIC RESEARCH</div>

  <div class="no-print" style="background: #10b981; color: white; padding: 12px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <strong>Pratinjau Cetak / Unduh Dokumen PDF</strong> — Klik tombol di sebelah kanan untuk menyimpan sebagai PDF.
    </div>
    <button onclick="window.print()" style="background: white; color: #065f46; border: none; font-weight: bold; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-size: 10pt;">
      🖨️ Cetak / Simpan PDF
    </button>
  </div>

  <div class="document-header">
    <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
    <p class="instansi-title">Pusat Kajian Tafsir Ahkam & Fiqh Komparatif</p>
    <p class="instansi-sub">Platform Akademik Quranica AI Studio · Riset Turats 4 Mazhab & Ulumul Qur'an</p>
  </div>

  <div class="meta-box">
    <div class="meta-item"><strong>Kategori:</strong> ${mode}</div>
    <div class="meta-item"><strong>Tanggal Terbit:</strong> ${currentDate}</div>
    <div class="meta-item"><strong>Topik Kajian:</strong> ${topic}</div>
    <div class="meta-item"><strong>Penyusun:</strong> ${author}</div>
    <div class="meta-item" style="grid-column: span 2;"><strong>Repositori Cloud:</strong> <a href="${sourceDriveUrl}" target="_blank">${sourceDriveUrl}</a></div>
  </div>

  <h1 class="main-title">${title}</h1>

  <div class="content-body">
    <p>${formattedHtml}</p>
  </div>

  <div class="footer-stamp">
    <div>
      <strong>Quranica Research Engine</strong> · Terverifikasi Berdasarkan Kitab Mu'tabar & Kutubut Tis'ah
    </div>
    <div>
      Dicetak secara digital: ${new Date().toISOString()}
    </div>
  </div>

  <script>
    // Buka dialog print secara otomatis setelah resource selesai dimuat
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(htmlDocument);
  printWindow.document.close();
}
