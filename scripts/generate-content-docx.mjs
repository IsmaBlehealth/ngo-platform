import { Document, Packer, Table, TableRow, TableCell, Paragraph, TextRun, WidthType, AlignmentType, ShadingType } from "docx";
import { writeFileSync } from "fs";

const sections = [
  {
    title: "HOMEPAGE — Hero Slides",
    items: [
      ["HP-01", "Every Child Deserves a Future", ""],
      ["HP-02", "Building sustainable futures through education, clean water, and healthcare in communities across Africa.", ""],
      ["HP-03", "Learning Starts Here", ""],
      ["HP-04", "Providing quality education to children in underserved communities across Côte d'Ivoire and Mali.", ""],
      ["HP-05", "Building Knowledge Together", ""],
      ["HP-06", "Interactive learning methods that engage students and build confidence from an early age.", ""],
      ["HP-07", "Resources That Change Lives", ""],
      ["HP-08", "School supplies, clean water access, and nutrition programs that keep children in school.", ""],
      ["HP-09", "Academic Excellence", ""],
      ["HP-10", "A 99% passing rate proves that with the right support, every student can succeed.", ""],
      ["HP-11", "GROUPE SCOLAIRE AGBÉ LAKOTA", ""],
      ["HP-12", "More than a school — a community hub where children learn, play, and grow together.", ""],
      ["HP-13", "Stronger Through Community", ""],
      ["HP-14", "Sports programs that teach teamwork, discipline, and bring entire communities together.", ""],
    ],
  },
  {
    title: "HOMEPAGE — Hero Buttons",
    items: [
      ["HP-15", "Donate Now", ""],
      ["HP-16", "Learn More", ""],
    ],
  },
  {
    title: "HOMEPAGE — Stats Bar",
    items: [
      ["HP-17", "2014 — Founded", ""],
      ["HP-18", "100K+ — Lives Impacted", ""],
      ["HP-19", "3 — Countries", ""],
      ["HP-20", "99% — Passing Rate", ""],
    ],
  },
  {
    title: "HOMEPAGE — Programs Section",
    items: [
      ["HP-21", "What We Do", ""],
      ["HP-22", "Our Programs", ""],
      ["HP-23", "We work across three core areas to create lasting change in communities worldwide.", ""],
      ["HP-24", "Clean Water Initiative", ""],
      ["HP-25", "Building sustainable water systems in communities across Africa and Latin America, providing access to clean drinking water for thousands.", ""],
      ["HP-26", "50K+ Lives Changed", ""],
      ["HP-27", "Education & Scholarships", ""],
      ["HP-28", "Empowering the next generation through education programs, school construction, and scholarship opportunities in Côte d'Ivoire and Mali.", ""],
      ["HP-29", "332 Students Enrolled", ""],
      ["HP-30", "Healthcare Programs", ""],
      ["HP-31", "Delivering essential healthcare services to underserved communities through mobile clinics and community health workers.", ""],
      ["HP-32", "15K+ Patients Treated", ""],
    ],
  },
  {
    title: "HOMEPAGE — About Section",
    items: [
      ["HP-33", "Who We Are", ""],
      ["HP-34", "Empowering Communities Since 2014", ""],
      ["HP-35", "Global Approach To Development is a 501(c)(3) non-profit organization founded by Dr. Keuleya Ruth Ble MD MPH. We work to provide sustainable solutions in clean water, education, and healthcare for communities across Africa and Latin America.", ""],
      ["HP-36", "With a 99% passing rate in our schools and programs reaching thousands of families, we are committed to creating lasting change.", ""],
      ["HP-37", "Our Story", ""],
    ],
  },
  {
    title: "HOMEPAGE — Impact Section",
    items: [
      ["HP-38", "Real Results", ""],
      ["HP-39", "Our Impact", ""],
      ["HP-40", "Clean Water Transformation", ""],
      ["HP-41", "Over 50,000 lives transformed through sustainable water systems. Our initiative provides access to clean drinking water, reducing waterborne diseases by 75% in communities we serve.", ""],
      ["HP-42", "Education Excellence", ""],
      ["HP-43", "With a 99% passing rate in our schools across Côte d'Ivoire and Mali, we are proving that quality education can reach even the most remote communities. 332 students currently enrolled.", ""],
      ["HP-44", "Healthcare Access", ""],
      ["HP-45", "Mobile health clinics bringing essential medical care to communities without access to hospitals. Over 15,000 patients treated across three countries.", ""],
    ],
  },
  {
    title: "HOMEPAGE — Donate Section",
    items: [
      ["HP-46", "Make a Difference", ""],
      ["HP-47", "Your Donation Changes Lives", ""],
      ["HP-48", "100% of your donation goes directly to our programs. No administrative fees. Every dollar makes a real impact.", ""],
      ["HP-49", "Donate $25", ""],
      ["HP-50", "Custom Amount", ""],
    ],
  },
  {
    title: "HOMEPAGE — Contact Section",
    items: [
      ["HP-51", "Get In Touch", ""],
      ["HP-52", "Contact Us", ""],
      ["HP-53", "3200 E Guasti Rd., Suite 100, Ontario, CA 91761", ""],
      ["HP-54", "909-728-8111", ""],
      ["HP-55", "info@gapdev.org", ""],
    ],
  },
  {
    title: "NAVEGACIÓN (HEADER)",
    items: [
      ["NA-01", "Home", ""],
      ["NA-02", "Programs", ""],
      ["NA-03", "Impact", ""],
      ["NA-04", "About Us", ""],
      ["NA-05", "Blog", ""],
      ["NA-06", "Contact Us", ""],
      ["NA-07", "Donate", ""],
      ["NA-08", "Sign In", ""],
    ],
  },
  {
    title: "FOOTER",
    items: [
      ["FO-01", "Building sustainable futures through clean water, quality education, and accessible healthcare in West Africa.", ""],
      ["FO-02", "Programs", ""],
      ["FO-03", "Quick Links", ""],
      ["FO-04", "© 2014 - {year} Global Approach To Development. All rights reserved.", ""],
      ["FO-05", "Privacy Policy", ""],
      ["FO-06", "Terms of Service", ""],
    ],
  },
  {
    title: "ABOUT",
    items: [
      ["AB-01", "About Us", ""],
    ],
  },
  {
    title: "PROGRAMS",
    items: [
      ["PG-01", "Our Programs", ""],
      ["PG-02", "Clean Water Initiative", ""],
      ["PG-04", "Education & Scholarships", ""],
      ["PG-06", "Healthcare Programs", ""],
    ],
  },
  {
    title: "EDUCATION",
    items: [
      ["ED-01", "Education & Scholarships", ""],
    ],
  },
  {
    title: "IMPACT",
    items: [
      ["IM-01", "Our Impact", ""],
    ],
  },
  {
    title: "BLOG",
    items: [
      ["BL-01", "Blog", ""],
      ["BL-02", "About Child Trauma", ""],
      ["BL-03", "Global Impact of Clean Water", ""],
      ["BL-04", "Scholarships for Underprivileged", ""],
      ["BL-05", "Mobile Health Clinics", ""],
    ],
  },
  {
    title: "DONATE",
    items: [
      ["DO-01", "Make a Difference", ""],
      ["DO-02", "One-Time", ""],
      ["DO-03", "Monthly", ""],
      ["DO-04", "Donate Now", ""],
    ],
  },
];

function textCell(text, options = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, size: 20, ...options })] })],
    verticalAlign: "center",
  });
}

function headerCell(text) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, color: "FFFFFF" })] })],
    shading: { type: ShadingType.SOLID, color: "0D5C63" },
    verticalAlign: "center",
  });
}

async function main() {
  const children = [];

  // Title
  children.push(
    new Paragraph({
      children: [new TextRun({ text: "CONTENT GUIDE — Global Approach To Development", bold: true, size: 32, color: "0D5C63" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );

  // Instructions
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: "Instrucciones:", bold: true, size: 22 }),
      ],
      spacing: { before: 200, after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '1. Busque el texto que quiere cambiar en las tablas de abajo.\n2. Escriba su texto nuevo en la columna "✏️ Texto nuevo".\n3. Guarde este archivo y envíemelo de vuelta.\n\nEjemplo: Si quiere cambiar "Clean Water Initiative" por "Clean Water & Sanitation", escriba eso en la casilla de HP-24.', size: 20 }),
      ],
      spacing: { after: 400 },
    })
  );

  for (const section of sections) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: section.title, bold: true, size: 24, color: "F58220" })],
        spacing: { before: 400, after: 200 },
      })
    );

    const tableRows = [
      new TableRow({
        children: [
          headerCell("Código"),
          headerCell("Texto actual"),
          headerCell("✏️ Su texto nuevo"),
        ],
        tableHeader: true,
      }),
    ];

    for (const [id, current, _new] of section.items) {
      tableRows.push(
        new TableRow({
          children: [
            textCell(id, { bold: true, color: "F58220" }),
            textCell(current),
            textCell(_new || ""),
          ],
        })
      );
    }

    children.push(
      new Table({
        rows: tableRows,
        width: { size: 100, type: WidthType.PERCENTAGE },
      })
    );
  }

  const doc = new Document({
    title: "Content Guide - GAD",
    description: "Editable content guide for Global Approach To Development website",
    styles: {
      default: {
        document: {
          run: { size: 20, font: "Calibri" },
        },
      },
    },
    sections: [{ children }],
  });

  const buffer = await Packer.toBuffer(doc);
  writeFileSync("CONTENT-EDITABLE.docx", buffer);
  console.log("✅ CONTENT-EDITABLE.docx generated successfully");
}

main().catch(console.error);
