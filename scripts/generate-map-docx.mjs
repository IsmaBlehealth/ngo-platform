import { Document, Packer, Table, TableRow, TableCell, Paragraph, TextRun, WidthType, AlignmentType, ShadingType } from "docx";
import { writeFileSync } from "fs";

const pages = [
  {
    title: "🏠 Página Principal / Homepage (/)",
    sections: [
      ["1", "Hero — Carrusel de 7 fotos", "Título principal, subtítulo, botones Donar / Learn More"],
      ["2", "Barra de Estadísticas", "4 indicadores: Fundado 2014, 100K+ vidas, 3 países, 99% aprobación"],
      ["3", "Sección Programas", "Título, descripción, 3 tarjetas (Clean Water, Education, Healthcare)"],
      ["4", "Sección Quiénes Somos", "Título, 2 párrafos de descripción, botón Our Story"],
      ["5", "Sección Impacto", "Título, 3 bloques (Water, Education, Health) con estadísticas"],
      ["6", "Sección Donación", "Título, descripción, botones de donación"],
      ["7", "Sección Contacto", "3 tarjetas: Address, Phone, Email"],
    ],
  },
  {
    title: "ℹ️ About / Acerca de (/about)",
    sections: [
      ["8", "About page", "Título de página, historia/misión, información fundadora, valores"],
    ],
  },
  {
    title: "📋 Programs / Programas (/programs)",
    sections: [
      ["9", "Programs page", "Título, Clean Water descripción completa, Education descripción, Healthcare descripción"],
    ],
  },
  {
    title: "📚 Education (/programs/education)",
    sections: [
      ["10", "Education page", "Contenido completo del programa educativo"],
    ],
  },
  {
    title: "📊 Impact / Impacto (/impact)",
    sections: [
      ["11", "Impact page", "Título, estadísticas detalladas, historias / casos de éxito"],
    ],
  },
  {
    title: "✍️ Blog (/blog)",
    sections: [
      ["12", "Blog list", "Lista de artículos del blog"],
      ["13", "Blog post individual", "Cada artículo con título y contenido"],
    ],
  },
  {
    title: "📞 Contact (/contact)",
    sections: [
      ["14", "Contact page", "Formulario de contacto, información de contacto"],
    ],
  },
  {
    title: "💳 Donate / Donar (/donate)",
    sections: [
      ["15", "Donate page", "Título, descripción, opciones one-time/monthly, formulario de pago"],
    ],
  },
  {
    title: "🧭 Navegación (Header)",
    sections: [
      ["16", "Nav bar", "Logo, 6 links de navegación, botón Donate, Sign In / Dashboard"],
    ],
  },
  {
    title: "🦶 Footer",
    sections: [
      ["17", "Footer", "Descripción misión, redes sociales, NewsletterForm, Programs links, Quick Links, copyright"],
    ],
  },
];

function headerCell(text) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, color: "FFFFFF" })] })],
    shading: { type: ShadingType.SOLID, color: "0D5C63" },
    verticalAlign: "center",
  });
}

function cell(text, options = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, size: 20, ...options })] })],
    verticalAlign: "center",
  });
}

async function main() {
  const children = [];

  // Title
  children.push(
    new Paragraph({
      children: [new TextRun({ text: "🗺️ MAPA DE CONTENIDO — Global Approach To Development", bold: true, size: 32, color: "0D5C63" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Guía visual de todas las páginas y secciones del sitio.", size: 20 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  for (const page of pages) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: page.title, bold: true, size: 24, color: "F58220" })],
        spacing: { before: 400, after: 200 },
      })
    );

    const tableRows = [
      new TableRow({
        children: [headerCell("N°"), headerCell("Sección"), headerCell("Contenido")],
        tableHeader: true,
      }),
    ];

    for (const [num, name, content] of page.sections) {
      tableRows.push(
        new TableRow({
          children: [
            cell(num, { bold: true, color: "F58220" }),
            cell(name, { bold: true }),
            cell(content),
          ],
        })
      );
    }

    children.push(
      new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } })
    );
  }

  // Instructions
  children.push(
    new Paragraph({
      children: [new TextRun({ text: "\n📌 Cómo usar este mapa", bold: true, size: 24, color: "0D5C63" })],
      spacing: { before: 600, after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({
        text: "Cuando quiera agregar o cambiar contenido, solo dígame el número de sección y lo que quiere poner.\n\nEjemplo:\n\"Sección 3: agrega un párrafo después de la descripción de Clean Water Initiative\"\n\"Sección 6: cambia el texto del botón de Donar\"\n\"Entre sección 7 y 8: agrega una nueva sección de ...\"",
        size: 20,
      })],
      spacing: { after: 200 },
    })
  );

  const doc = new Document({
    title: "Content Map - GAD",
    description: "Visual content map for Global Approach To Development website",
    sections: [{ children }],
  });

  const buffer = await Packer.toBuffer(doc);
  writeFileSync("CONTENT-MAP.docx", buffer);
  console.log("✅ CONTENT-MAP.docx generated successfully");
}

main().catch(console.error);
