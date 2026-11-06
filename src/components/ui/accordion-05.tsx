import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import "../../styles/accordion.css";

const items = [
  {
    id: "1", title: "Sell what the floor can carry", products: ["neev", "ayana"],
    content: "Capacity, power and cooling headroom in the same place the deal is written.",
    today: "The CRM quotes space the hall doesn’t have, or sits on kilowatts it could sell. Facilities find out at handover.",
    solution: "Ayana reads live headroom from Neev: rack, power path, cooling. A quote is checked against the floor before it goes out.",
    question: "What can we sell in Hall 2 next quarter without a new feeder?",
  },
  {
    id: "2", title: "Alarm to invoice, linked", products: ["neev", "vitana", "ayana"],
    content: "A reading becomes an alarm, an incident, a change and a credit. One chain, no re-keying.",
    today: "The BMS raised it, the NOC ticketed it, finance credited it. Three tools, three IDs, nobody can replay the chain.",
    solution: "Reading → alarm → incident → change → credit, linked on the same rack and contract. The dispute answers itself.",
    question: "Which customers were affected by the Feeder 2 trip, and what do we owe them?",
  },
  {
    id: "3", title: "Contract to powered rack", products: ["ayana", "neev"],
    content: "Go-live without the handover losing the data.",
    today: "The contract is in the CRM, the rack in a spreadsheet, the power path in someone’s head. The handover re-keys all three.",
    solution: "The contract creates the rack, the power path and the work order. Energised means billable, automatically.",
    question: "What’s left before Northwind’s 24 racks are billable?",
  },
  {
    id: "4", title: "Audit packs that assemble themselves", products: ["vitana"],
    content: "Who changed what, when, with which approval. Already there when the auditor asks.",
    today: "Exports, inboxes and screenshots, stitched together to prove who approved what, three months later.",
    solution: "Every approval, override and edit is kept with who and when. The pack for any hall, customer or period is a query.",
    question: "Show every change to Hall 2 power in Q3 and who signed each one off.",
  },
  {
    id: "5", title: "GPU and cloud tenants on the same record", products: ["aire"],
    content: "Provision, meter and bill compute in the hall it actually runs in.",
    today: "GPU and cloud tenants are metered and billed by a separate platform that has never heard of the hall they run in.",
    solution: "Aire provisions and meters compute on the same rack, power and customer objects. One invoice, one record.",
    question: "How much of Pod 4’s power is billed, and to whom?",
  },
  {
    id: "6", title: "Customers who can see their own floor", products: ["ayana", "vitana"],
    content: "Power, tickets, changes and invoices for their racks and nothing else.",
    today: "Power reports by email, tickets by phone, invoices from a different portal. Every question is a call.",
    solution: "A customer sees their racks, their power, their open tickets and their invoices, and only theirs. Roles do the rest.",
    question: "Can my team see live power on our racks and raise a change from the same screen?",
  },
];

export function Accordion05() {
  return (
    <div className="d-use-accordion w-full mx-auto">
      <Accordion type="single" defaultValue="1" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id}>
            <AccordionTrigger>
              <span className="d-use-number" aria-hidden="true">0{item.id}</span>
              <span className="d-use-title">{item.title}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="d-use-products" aria-label="Products involved">
                {item.products.map((product) => (
                  <a href={`/${product}`} key={product}>
                    <img src={`/media/${product}-mark.svg`} alt="" width="24" height="24" />
                    {product}
                  </a>
                ))}
              </div>
              <p className="d-use-summary">{item.content}</p>
              <div className="d-use-details">
                <div><span className="d-use-label">Today</span><p>{item.today}</p></div>
                <div><span className="d-use-label">With DIL</span><p>{item.solution}</p></div>
              </div>
              <p className="d-use-question">“{item.question}”</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
