// Generated from the design source. Edit copy here; the page template is src/components/ProductPage.astro.
export type Product = typeof products[keyof typeof products];
export const products = {
  "dil": {
    "slug": "dil",
    "title": "DIL · The system of record for the data centre",
    "eyebrow": "Platform · DIL",
    "shape": "heart",
    "cap": "DIL · the record",
    "h1": "The system of record <span>for the data centre.</span>",
    "lede": "One record of every site, hall, rack, power path, customer, contract, ticket, change and credit. One ID each, kept for life. Four products read and write it, so nothing else has to agree.",
    "how_h": "One record, <em>built in six moves.</em>",
    "how_p": "DIL does not replace what you run. It reads it, reconciles it, and becomes the copy everyone trusts.",
    "steps": [
      {
        "h": "Connect what you already run.",
        "p": "Connectors read your BMS, EPMS, DCIM, ITSM, finance and identity systems. Each has an owner, a mapping and a mismatch report. Nothing is ripped out.",
        "tags": [
          "BMS",
          "EPMS",
          "DCIM",
          "ITSM",
          "ERP",
          "SSO"
        ],
        "mock": {
          "type": "table",
          "title": "Connectors",
          "status": "6 live",
          "cols": [
            "Source",
            "Owner",
            "Objects",
            "Last sync",
            "Mismatches"
          ],
          "rows": [
            [
              "EcoStruxure BMS",
              "M. Keller",
              "1,204",
              "2 min",
              "<span class=\"tag ok\">0</span>"
            ],
            [
              "ION EPMS",
              "M. Keller",
              "388",
              "2 min",
              "<span class=\"tag warn\">3</span>"
            ],
            [
              "Nlyte DCIM",
              "L. Moreau",
              "2,910",
              "6 min",
              "<span class=\"tag warn\">12</span>"
            ],
            [
              "ServiceNow",
              "J. Park",
              "740",
              "1 min",
              "<span class=\"tag ok\">0</span>"
            ],
            [
              "NetSuite",
              "Finance",
              "212",
              "1 h",
              "<span class=\"tag warn\">1</span>"
            ]
          ],
          "hi": 2
        }
      },
      {
        "h": "Reconcile to one ID.",
        "p": "The same rack arrives spelled five ways. DIL resolves it to one object with one ID, keeps the aliases, and shows you what still disagrees.",
        "tags": [
          "One ID",
          "Aliases kept",
          "Mismatch report"
        ],
        "mock": {
          "type": "form",
          "title": "Resolve · Rack",
          "status": "1 object",
          "fields": [
            [
              "DIL ID",
              "rk_2b14 · kept for life",
              true
            ],
            [
              "BMS",
              "2B-14",
              false
            ],
            [
              "DCIM",
              "Rack 2B/14",
              false
            ],
            [
              "CRM",
              "R2B14",
              false
            ],
            [
              "Ticketing",
              "2b_14",
              false
            ],
            [
              "Spreadsheet",
              "2B-14 (old)",
              false
            ]
          ],
          "btn": "Merge · keep aliases"
        }
      },
      {
        "h": "Link the chain.",
        "p": "A reading becomes an alarm, an incident, a change and a credit. Every link is on the same rack and the same contract, so the story replays end to end.",
        "tags": [
          "Reading",
          "Alarm",
          "Incident",
          "Change",
          "Credit"
        ],
        "mock": {
          "type": "chain",
          "title": "Chain of record · rk_2b14",
          "items": [
            [
              "Reading 41.2 °C",
              false
            ],
            [
              "Alarm · inlet high",
              false
            ],
            [
              "INC-20417",
              true
            ],
            [
              "CHG-5531",
              false
            ],
            [
              "Credit · $1,120",
              false
            ]
          ],
          "note": "Each link carries who, when and why. Nothing is re-keyed between them."
        }
      },
      {
        "h": "Share the queue.",
        "p": "Incidents and changes live in DIL, not in a product. Facilities, the NOC, sales and finance see the same item with the fields their role needs.",
        "tags": [
          "One queue",
          "Roles",
          "Customer view"
        ],
        "mock": {
          "type": "timeline",
          "title": "INC-20417 · shared",
          "items": [
            [
              "09:02",
              "bad",
              "Alarm raised by EcoStruxure",
              "Rack 2B-14 · inlet 41.2 °C"
            ],
            [
              "09:04",
              "warn",
              "Incident opened · NOC",
              "Customer Northwind attached automatically"
            ],
            [
              "09:14",
              "acc",
              "Change CHG-5531 approved · Facilities",
              "Reason kept · window 09:30–10:30"
            ],
            [
              "10:40",
              "ok",
              "Resolved · signed off",
              "SLA breach 38 min · credit queued"
            ],
            [
              "11:05",
              "ok",
              "Credit issued · Finance",
              "On the next Northwind invoice"
            ]
          ]
        }
      },
      {
        "h": "Prove it, any time.",
        "p": "Every approval, override and edit is kept, with who and when. Audit packs for any hall, customer or period are a query, not a hunt.",
        "tags": [
          "Attributed writes",
          "Audit pack",
          "Exports"
        ],
        "mock": {
          "type": "table",
          "title": "Audit · Hall 2 power · Q3",
          "status": "412 events",
          "cols": [
            "When",
            "What",
            "Who",
            "Approval"
          ],
          "rows": [
            [
              "12 Jul 09:14",
              "Breaker 2B-07 set-point",
              "M. Keller",
              "<span class=\"tag ok\">CHG-5102</span>"
            ],
            [
              "30 Jul 14:02",
              "Feeder 2 maintenance",
              "L. Moreau",
              "<span class=\"tag ok\">CHG-5180</span>"
            ],
            [
              "18 Aug 11:31",
              "Override · UPS B bypass",
              "M. Keller",
              "<span class=\"tag warn\">Reason kept</span>"
            ],
            [
              "02 Sep 16:45",
              "Capacity reservation · NW",
              "J. Park",
              "<span class=\"tag ok\">CHG-5531</span>"
            ]
          ]
        }
      },
      {
        "h": "Extend it.",
        "p": "Dashboards, scheduled reports and a documented API over the same record. Your data stays exportable, in full, whenever you ask.",
        "tags": [
          "API",
          "Reports",
          "Webhooks",
          "Full export"
        ],
        "mock": {
          "type": "kpis",
          "title": "Record · today",
          "items": [
            [
              "Objects",
              "48,212",
              "+312 this week"
            ],
            [
              "Open mismatches",
              "16",
              "down from 1,870"
            ],
            [
              "API calls / day",
              "1.2M",
              "4 integrations"
            ],
            [
              "Last full export",
              "02:00",
              "nightly · yours"
            ]
          ]
        }
      }
    ],
    "hood_h": "What makes the record <em>hold.</em>",
    "hood_p": "Three properties, and the four products inherit all of them.",
    "hood": [
      {
        "h": "One object, one ID",
        "p": "Every site, hall, rack, power path, person, contract and ticket is one object. Products reference it; they never copy it.",
        "sub": [
          [
            "Aliases kept",
            "Old names stay searchable."
          ],
          [
            "Mismatch report",
            "What still disagrees, and whose it is."
          ],
          [
            "Kept for life",
            "Decommissioned is a state, not a deletion."
          ]
        ]
      },
      {
        "h": "Linked, not joined later",
        "p": "Readings, alarms, incidents, changes and credits are written as links at the moment they happen.",
        "sub": [
          [
            "Chain of record",
            "Sensor to bill, replayable."
          ],
          [
            "Shared queue",
            "One incident, every role."
          ],
          [
            "Customer scope",
            "Their floor and nothing else."
          ]
        ]
      },
      {
        "h": "Attributed and consistent",
        "p": "Every write carries who, when and why. Reads are strongly consistent across the four products.",
        "sub": [
          [
            "Approvals",
            "Windows, sign-offs, overrides."
          ],
          [
            "Audit packs",
            "A filter, not a hunt."
          ],
          [
            "Exports",
            "Full, on demand, yours."
          ]
        ]
      }
    ],
    "mid": "Running more than one hall on more than one tool? Bring your connector list and we will map it to the record in a working session.",
    "integ_p": "Read first, write where you let it. Each connector ships with an owner, a mapping and a mismatch report.",
    "integ": [
      {
        "h": "Building & power",
        "p": "BMS and EPMS, for readings, alarms and set-points.",
        "items": [
          [
            "Schneider EcoStruxure",
            "schneiderelectric"
          ],
          [
            "Siemens Desigo",
            "siemens"
          ],
          [
            "Honeywell",
            "honeywell"
          ],
          [
            "Johnson Controls",
            null
          ],
          [
            "ABB",
            "abb"
          ],
          [
            "Eaton",
            null
          ],
          [
            "Vertiv",
            null
          ]
        ]
      },
      {
        "h": "Inventory",
        "p": "DCIM and asset systems, for racks, assets and cabling.",
        "items": [
          [
            "Nlyte",
            null
          ],
          [
            "Sunbird dcTrack",
            null
          ],
          [
            "EcoStruxure IT",
            "schneiderelectric"
          ],
          [
            "Device42",
            null
          ],
          [
            "NetBox",
            null
          ]
        ]
      },
      {
        "h": "Tickets & monitoring",
        "p": "Where incidents and alerts live today.",
        "items": [
          [
            "ServiceNow",
            "servicenow"
          ],
          [
            "Jira Service Management",
            "jira"
          ],
          [
            "Freshservice",
            "freshworks"
          ],
          [
            "Zabbix",
            "zabbix"
          ],
          [
            "Prometheus",
            "prometheus"
          ],
          [
            "PagerDuty",
            "pagerduty"
          ]
        ]
      },
      {
        "h": "Money & people",
        "p": "Finance, CRM and identity.",
        "items": [
          [
            "SAP",
            "sap"
          ],
          [
            "Oracle NetSuite",
            "oracle"
          ],
          [
            "Salesforce",
            "salesforce"
          ],
          [
            "HubSpot",
            "hubspot"
          ],
          [
            "Okta",
            "okta"
          ],
          [
            "Microsoft Entra ID",
            null
          ],
          [
            "Google Workspace",
            "google"
          ]
        ]
      }
    ],
    "protos": [
      "Modbus TCP",
      "BACnet/IP",
      "SNMP",
      "OPC UA",
      "MQTT",
      "REST",
      "Webhooks",
      "CSV / SFTP"
    ],
    "cta_h": "Map your floor. <span>Keep the record.</span>",
    "cta_p": "Design partner places are open for operators running 2 MW and up."
  },
  "ayana": {
    "slug": "ayana",
    "title": "Ayana · Sell against the floor",
    "eyebrow": "01 · Sell · Ayana",
    "shape": "coins",
    "cap": "Ayana · CRM + billing & revenue",
    "h1": "The CRM that knows <span>the capacity.</span>",
    "lede": "Accounts, contracts, metered usage, invoices and revenue, read from the floor they cover. Quote what the hall can carry. Bill what the meter saw. Never re-key either.",
    "how_h": "From first call <em>to recurring revenue.</em>",
    "how_p": "Seven moves, one record. The deal, the rack and the invoice are the same object seen by three teams.",
    "steps": [
      {
        "h": "Account and site.",
        "p": "Every customer is one object with its sites, contacts, halls and history. The account team sees what the NOC sees, scoped to their job.",
        "tags": [
          "Accounts",
          "Contacts",
          "Sites"
        ],
        "mock": {
          "type": "cards",
          "title": "Account · Northwind Cloud",
          "items": [
            [
              "Hall 2 · Site A",
              "24 racks · 192 kW",
              "live",
              "ok"
            ],
            [
              "Hall 4 · Site A",
              "8 racks · 64 kW",
              "go-live Q1",
              "acc"
            ],
            [
              "Cross-connects",
              "14 active",
              "",
              ""
            ],
            [
              "Open tickets",
              "1 · INC-20417",
              "SLA at risk",
              "warn"
            ]
          ]
        }
      },
      {
        "h": "Quote against the floor.",
        "p": "A quote is checked against live headroom in Neev before it goes out: space, power path, cooling. Stranded kilowatts become sellable; oversold ones never leave the building.",
        "tags": [
          "Live headroom",
          "Power path",
          "Reservations"
        ],
        "mock": {
          "type": "form",
          "title": "Quote · Q-2026-118",
          "status": "checked vs floor",
          "fields": [
            [
              "Customer",
              "Northwind Cloud",
              false
            ],
            [
              "Request",
              "12 racks · 8 kW each · Hall 2",
              false
            ],
            [
              "Space",
              "Row C · 14 positions free",
              true
            ],
            [
              "Power",
              "Feeder 2 · 118 kW headroom",
              true
            ],
            [
              "Cooling",
              "CRAH C3 · 84% · ok",
              true
            ],
            [
              "Reserve until",
              "30 Nov",
              false
            ]
          ],
          "btn": "Reserve capacity · send quote"
        }
      },
      {
        "h": "Contract.",
        "p": "What was sold, at what rate, with which commitments. Committed kilowatts, metered usage, cross-connects, SLA terms and credits, all on the account and the racks they cover.",
        "tags": [
          "Committed kW",
          "Metered",
          "SLA terms"
        ],
        "mock": {
          "type": "table",
          "title": "Contract · NW-117",
          "status": "active",
          "cols": [
            "Line",
            "Qty",
            "Rate",
            "Basis"
          ],
          "rows": [
            [
              "Rack space · Hall 2",
              "24",
              "$ 220 / mo",
              "fixed"
            ],
            [
              "Committed power",
              "192 kW",
              "$ 0.11 / kWh",
              "committed"
            ],
            [
              "Metered overage",
              "as used",
              "$ 0.14 / kWh",
              "metered"
            ],
            [
              "Cross-connect",
              "14",
              "$ 250 / mo",
              "fixed"
            ],
            [
              "SLA credit",
              "per breach",
              "5% / hr",
              "auto"
            ]
          ],
          "hi": 2
        }
      },
      {
        "h": "Go-live without the handover.",
        "p": "Signing creates the racks, the power path and the work orders in Neev. Energised means billable, automatically, on the day it happened.",
        "tags": [
          "Work orders",
          "Energised = billable"
        ],
        "mock": {
          "type": "timeline",
          "title": "Go-live · NW-117",
          "items": [
            [
              "Day 0",
              "ok",
              "Contract signed",
              "24 racks created in Neev · rk_2c01–2c24"
            ],
            [
              "Day 3",
              "ok",
              "Power path assigned",
              "Feeder 2 → PDU 2C-01..04"
            ],
            [
              "Day 9",
              "acc",
              "Racks energised · 18 of 24",
              "Billing started for 18 · pro-rated"
            ],
            [
              "Day 12",
              "warn",
              "6 racks waiting on cross-connects",
              "Ticket open with carrier"
            ],
            [
              "Day 14",
              "ok",
              "All 24 billable",
              "First invoice on 1st"
            ]
          ]
        }
      },
      {
        "h": "Meter.",
        "p": "kWh, cross-connects and remote hands are metered on the floor by Neev and arrive as usage, per rack, per contract line. No spreadsheet in the middle.",
        "tags": [
          "kWh per rack",
          "Cross-connects",
          "Remote hands"
        ],
        "mock": {
          "type": "bars",
          "title": "Usage · Northwind · November",
          "items": [
            [
              "Rack 2C-01",
              86,
              "6.9 kW",
              null
            ],
            [
              "Rack 2C-02",
              74,
              "5.9 kW",
              null
            ],
            [
              "Rack 2C-03",
              101,
              "8.1 kW",
              "#C8463B"
            ],
            [
              "Rack 2C-04",
              58,
              "4.6 kW",
              null
            ],
            [
              "Rack 2C-05",
              92,
              "7.4 kW",
              null
            ],
            [
              "Overage",
              12,
              "1 rack",
              "#C8463B"
            ]
          ]
        }
      },
      {
        "h": "Invoice and revenue.",
        "p": "Fixed lines, committed power, metered overage and credits roll into one invoice per account. Revenue is recognised from the record, and finance reads it in their own system.",
        "tags": [
          "One invoice",
          "Credits applied",
          "Revenue schedule"
        ],
        "mock": {
          "type": "table",
          "title": "Invoice · NW-2026-11",
          "status": "$ 23.1k",
          "cols": [
            "Line",
            "Amount",
            "Source"
          ],
          "rows": [
            [
              "Rack space · 24",
              "$ 5,280",
              "contract"
            ],
            [
              "Committed power · 192 kW",
              "$ 15,210",
              "contract"
            ],
            [
              "Metered overage · 1,840 kWh",
              "$ 258",
              "Neev meter"
            ],
            [
              "Cross-connects · 14",
              "$ 3,500",
              "contract"
            ],
            [
              "SLA credit · INC-20417",
              "− $ 1,120",
              "Vitana incident"
            ],
            [
              "Total",
              "$ 23,128",
              "to NetSuite"
            ]
          ],
          "hi": 4
        }
      },
      {
        "h": "Renew with the numbers in hand.",
        "p": "Utilisation, overage, incidents and credits per account, a year back. Renewals and upsells are priced on what the floor actually did.",
        "tags": [
          "Utilisation",
          "Overage trend",
          "Credits"
        ],
        "mock": {
          "type": "kpis",
          "title": "Renewal · Northwind · Mar",
          "items": [
            [
              "Avg utilisation",
              "81%",
              "of committed kW"
            ],
            [
              "Overage months",
              "7 / 12",
              "upsell 48 kW"
            ],
            [
              "Incidents",
              "3",
              "credits $ 3,400"
            ],
            [
              "Churn risk",
              "low",
              "NPS 9 · 2 expansions"
            ]
          ]
        }
      }
    ],
    "hood_h": "What makes Ayana <em>different.</em>",
    "hood_p": "It is a CRM and a billing engine on the same record as the hall.",
    "hood": [
      {
        "h": "Sells what exists",
        "p": "Quotes are checked against Neev's live headroom. The pipeline cannot promise a feeder that is full.",
        "sub": [
          [
            "Live headroom",
            "Space, power, cooling per hall."
          ],
          [
            "Reservations",
            "Hold capacity against a quote, with an expiry."
          ],
          [
            "No ERP sprawl",
            "Billing and revenue, not a general ledger."
          ]
        ]
      },
      {
        "h": "Bills what the meter saw",
        "p": "Usage arrives from the floor per rack and contract line. Credits arrive from incidents. Nothing is typed twice.",
        "sub": [
          [
            "Metered + committed",
            "Both bases on one invoice."
          ],
          [
            "Automatic credits",
            "From Vitana incidents, with the chain attached."
          ],
          [
            "Finance stays put",
            "Invoices post to SAP or NetSuite."
          ]
        ]
      },
      {
        "h": "Shows the customer their floor",
        "p": "A customer portal scoped by role: their racks, power, tickets, changes and invoices. Only theirs.",
        "sub": [
          [
            "Scoped views",
            "Roles do the work."
          ],
          [
            "Self-serve",
            "Raise a change from the same screen."
          ],
          [
            "Exports",
            "Their data, their format."
          ]
        ]
      }
    ],
    "mid": "Selling colocation, powered shell and cloud from the same campus? Bring a quote you lost to capacity and we will show where it would have been caught.",
    "integ_p": "Keep your CRM and your ledger. Ayana reads accounts and posts invoices; the record stays in DIL.",
    "integ": [
      {
        "h": "CRM",
        "p": "Two-way accounts and opportunities.",
        "items": [
          [
            "Salesforce",
            "salesforce"
          ],
          [
            "HubSpot",
            "hubspot"
          ],
          [
            "Pipedrive",
            null
          ],
          [
            "Microsoft Dynamics 365",
            null,
            true
          ]
        ]
      },
      {
        "h": "Finance & ERP",
        "p": "Invoices out, payments and revenue back.",
        "items": [
          [
            "SAP",
            "sap"
          ],
          [
            "Oracle NetSuite",
            "oracle"
          ],
          [
            "Xero",
            "xero"
          ],
          [
            "QuickBooks",
            "quickbooks"
          ],
          [
            "Microsoft Dynamics 365",
            null,
            true
          ]
        ]
      },
      {
        "h": "Payments & documents",
        "p": "Collect and sign without leaving the record.",
        "items": [
          [
            "Stripe",
            "stripe"
          ],
          [
            "Adyen",
            "adyen"
          ],
          [
            "DocuSign",
            "docusign"
          ],
          [
            "Adobe Sign",
            "adobe",
            true
          ]
        ]
      },
      {
        "h": "Identity & comms",
        "p": "Single sign-on and where the account team already talks.",
        "items": [
          [
            "Okta",
            "okta"
          ],
          [
            "Microsoft Entra ID",
            null
          ],
          [
            "Google Workspace",
            "google"
          ],
          [
            "Slack",
            "slack"
          ],
          [
            "Microsoft Teams",
            null
          ]
        ]
      }
    ],
    "protos": [
      "REST",
      "Webhooks",
      "CSV / SFTP",
      "e-invoicing"
    ],
    "cta_h": "Quote the floor. <span>Bill the meter.</span>",
    "cta_p": "Bring your rate card and one hall. We will show you the first invoice built from the record."
  },
  "neev": {
    "slug": "neev",
    "title": "Neev · Run the floor as one",
    "eyebrow": "02 · Operate · Neev",
    "shape": "pillar",
    "cap": "Neev · DC Ops",
    "h1": "Run the floor <span>as one.</span>",
    "lede": "Racks, power, cooling, capacity and the work that keeps them running. Read from the BMS and EPMS you already have, written to the record everyone else uses.",
    "how_h": "From the first hall <em>to the last decommission.</em>",
    "how_p": "Six moves. Every one of them lands on the same rack object the CRM and the NOC see.",
    "steps": [
      {
        "h": "Map the floor.",
        "p": "Sites, halls, rows, racks, power paths and cooling zones as one model. Imported from DCIM and drawings, reconciled to one ID per object.",
        "tags": [
          "Hall model",
          "Power path",
          "Cooling zones"
        ],
        "mock": {
          "type": "grid",
          "title": "Hall 2 · row map",
          "cells": [
            "a",
            "a",
            "a",
            "a",
            "a",
            "",
            "",
            "a",
            "a",
            "a",
            "a",
            "w",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "",
            "",
            "",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "b",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "w",
            "w",
            "a",
            "a",
            "a",
            "a",
            "a"
          ],
          "legend": [
            [
              "Live",
              "var(--pa)"
            ],
            [
              "Reserved",
              "#E9B44C"
            ],
            [
              "Alarm",
              "#C8463B"
            ]
          ]
        }
      },
      {
        "h": "Read power and cooling.",
        "p": "Utility to UPS to PDU to breaker, CRAH to row to inlet. Live readings and alarms arrive through connectors and attach to the asset they came from.",
        "tags": [
          "EPMS",
          "BMS",
          "Per-rack inlet"
        ],
        "mock": {
          "type": "kpis",
          "title": "Hall 2 · live",
          "items": [
            [
              "IT load",
              "1.42 MW",
              "of 1.8 MW"
            ],
            [
              "Feeder 2",
              "118 kW",
              "headroom"
            ],
            [
              "PUE · 24 h",
              "1.38",
              "target 1.35"
            ],
            [
              "Inlet max",
              "41.2 °C",
              "rack 2B-14 · alarm"
            ]
          ]
        }
      },
      {
        "h": "Capacity and headroom.",
        "p": "Space, power and cooling headroom per hall, row and feeder, with reservations from Ayana already subtracted. Stranded kilowatts show up as a number, not a rumour.",
        "tags": [
          "Headroom",
          "Stranded kW",
          "Reservations"
        ],
        "mock": {
          "type": "bars",
          "title": "Headroom · by feeder",
          "items": [
            [
              "Feeder 1",
              92,
              "14 kW",
              "#C8463B"
            ],
            [
              "Feeder 2",
              61,
              "118 kW",
              null
            ],
            [
              "Feeder 3",
              48,
              "156 kW",
              null
            ],
            [
              "Feeder 4 · reserved",
              83,
              "51 kW",
              "#E9B44C"
            ],
            [
              "Cooling · CRAH C",
              84,
              "ok",
              null
            ]
          ]
        }
      },
      {
        "h": "Work orders and PPM.",
        "p": "Planned maintenance, installs, moves and remote hands as work orders on the asset, with windows, approvals and the change they belong to.",
        "tags": [
          "PPM",
          "Installs",
          "Remote hands"
        ],
        "mock": {
          "type": "table",
          "title": "Work · this week",
          "status": "23 open",
          "cols": [
            "WO",
            "Asset",
            "Type",
            "Window",
            "State"
          ],
          "rows": [
            [
              "WO-8812",
              "UPS B",
              "PPM · quarterly",
              "Thu 02:00",
              "<span class=\"tag ok\">Approved</span>"
            ],
            [
              "WO-8819",
              "Rack 2C-19..24",
              "Install · NW",
              "Fri 10:00",
              "<span class=\"tag acc\">Scheduled</span>"
            ],
            [
              "WO-8823",
              "CRAH C3",
              "Filter change",
              "Sat 06:00",
              "<span class=\"tag warn\">Awaiting parts</span>"
            ],
            [
              "WO-8825",
              "PDU 2B-07",
              "Breaker set-point",
              "Thu 09:30",
              "<span class=\"tag ok\">CHG-5531</span>"
            ]
          ],
          "hi": 3
        }
      },
      {
        "h": "Alarms into incidents.",
        "p": "An alarm becomes an incident in the shared queue with the rack, the customer and the SLA attached. The NOC and facilities work the same item.",
        "tags": [
          "Shared queue",
          "SLA attached",
          "Customer attached"
        ],
        "mock": {
          "type": "timeline",
          "title": "Alarm → incident",
          "items": [
            [
              "09:02",
              "bad",
              "Inlet high · rack 2B-14 · 41.2 °C",
              "from EcoStruxure"
            ],
            [
              "09:02",
              "acc",
              "Incident INC-20417 opened",
              "Northwind · SLA 99.99 · clock started"
            ],
            [
              "09:14",
              "acc",
              "CHG-5531 · raise CRAH C3 set-point",
              "approved · M. Keller"
            ],
            [
              "09:48",
              "ok",
              "Inlet 27.4 °C · clearing",
              "auto-resolve in 30 min"
            ]
          ]
        }
      },
      {
        "h": "Handover and decommission.",
        "p": "Energised racks become billable in Ayana on the day. Decommissioned ones stay in the record as history, with everything that ever happened to them.",
        "tags": [
          "Energised → billable",
          "History kept"
        ],
        "mock": {
          "type": "form",
          "title": "Rack 2C-07 · lifecycle",
          "fields": [
            [
              "Created",
              "Day 0 · from NW-117",
              false
            ],
            [
              "Power path",
              "Feeder 2 → PDU 2C-02",
              false
            ],
            [
              "Energised",
              "Day 9 · 14:20 · billable",
              true
            ],
            [
              "Alarms · lifetime",
              "3",
              false
            ],
            [
              "Changes · lifetime",
              "7",
              false
            ],
            [
              "State",
              "live · 412 days",
              true
            ]
          ]
        }
      }
    ],
    "hood_h": "What makes Neev <em>different.</em>",
    "hood_p": "It is DC operations on the same record as the contract and the ticket.",
    "hood": [
      {
        "h": "Reads, does not replace",
        "p": "Your BMS, EPMS and DCIM stay. Neev reads them through connectors with owners and mismatch reports.",
        "sub": [
          [
            "Connectors",
            "Modbus, BACnet, SNMP, OPC UA and vendor APIs."
          ],
          [
            "One ID",
            "A rack is one object, however many tools name it."
          ],
          [
            "Mismatch report",
            "What still disagrees, by source."
          ]
        ]
      },
      {
        "h": "Capacity the CRM can trust",
        "p": "Headroom is computed per feeder and row with reservations already subtracted, and Ayana reads it live.",
        "sub": [
          [
            "Stranded kW",
            "Found and sold."
          ],
          [
            "Reservations",
            "Held against quotes, with expiry."
          ],
          [
            "Energised = billable",
            "No handover spreadsheet."
          ]
        ]
      },
      {
        "h": "Work with a chain",
        "p": "Every work order belongs to a change, every change to an asset and an approval. Audit packs assemble themselves.",
        "sub": [
          [
            "PPM",
            "Scheduled from the asset, not a calendar."
          ],
          [
            "Approvals",
            "Windows and sign-offs kept."
          ],
          [
            "History",
            "Decommissioned is a state."
          ]
        ]
      }
    ],
    "mid": "Running a BMS, an EPMS and a DCIM that have never met? Bring an alarm you had to chase by phone and we will replay it on the record.",
    "integ_p": "Neev speaks to the building through the protocols and vendors you already have on the floor.",
    "integ": [
      {
        "h": "BMS",
        "p": "Cooling, environment, alarms.",
        "items": [
          [
            "Schneider EcoStruxure",
            "schneiderelectric"
          ],
          [
            "Siemens Desigo",
            "siemens"
          ],
          [
            "Honeywell EBI",
            "honeywell"
          ],
          [
            "Johnson Controls Metasys",
            null
          ],
          [
            "Carrier i-Vu",
            null,
            true
          ]
        ]
      },
      {
        "h": "EPMS & power",
        "p": "Meters, breakers, UPS, gensets.",
        "items": [
          [
            "Schneider PowerLogic",
            "schneiderelectric"
          ],
          [
            "ABB Ability",
            "abb"
          ],
          [
            "Eaton",
            null
          ],
          [
            "Vertiv",
            null
          ],
          [
            "Siemens SICAM",
            "siemens"
          ],
          [
            "Cummins PowerCommand",
            null,
            true
          ]
        ]
      },
      {
        "h": "DCIM & inventory",
        "p": "Racks, assets, cabling.",
        "items": [
          [
            "Nlyte",
            null
          ],
          [
            "Sunbird dcTrack",
            null
          ],
          [
            "EcoStruxure IT",
            "schneiderelectric"
          ],
          [
            "Device42",
            null
          ],
          [
            "NetBox",
            null
          ]
        ]
      },
      {
        "h": "Sensors & edge",
        "p": "Where the readings are born.",
        "items": [
          [
            "Modbus TCP",
            null
          ],
          [
            "BACnet/IP",
            null
          ],
          [
            "SNMP v2/v3",
            null
          ],
          [
            "OPC UA",
            null
          ],
          [
            "MQTT",
            "mqtt"
          ],
          [
            "LoRaWAN",
            null,
            true
          ]
        ]
      }
    ],
    "protos": null,
    "cta_h": "Bring one hall. <span>Watch it run as one.</span>",
    "cta_p": "Design partner places are open for operators running 2 MW and up."
  },
  "vitana": {
    "slug": "vitana",
    "title": "Vitana · Resolve with the floor attached",
    "eyebrow": "03 · Resolve · Vitana",
    "shape": "beacon",
    "cap": "Vitana · IT Ops",
    "h1": "The ticket that knows <span>the rack.</span>",
    "lede": "Monitoring, incidents, changes and runbooks, with the rack, the customer and the SLA already attached. The NOC works one queue with facilities and finance, not three.",
    "how_h": "From signal <em>to signed-off.</em>",
    "how_p": "Six moves. Every alert lands on an object the rest of the business already knows.",
    "steps": [
      {
        "h": "Monitor what matters.",
        "p": "Infrastructure and environmental signals in one view, mapped to racks, customers and contracts. Noise is grouped by the asset it came from.",
        "tags": [
          "Infra + environment",
          "Grouped by asset"
        ],
        "mock": {
          "type": "table",
          "title": "Signals · last 15 min",
          "status": "3 open",
          "cols": [
            "Signal",
            "Asset",
            "Customer",
            "Sev",
            "State"
          ],
          "rows": [
            [
              "Inlet temperature",
              "Rack 2B-14",
              "Northwind",
              "<span class=\"tag bad\">P1</span>",
              "open 00:38"
            ],
            [
              "Link flap",
              "Sw-2C-agg-1",
              "Shared",
              "<span class=\"tag warn\">P3</span>",
              "grouped · 14 events"
            ],
            [
              "UPS B on battery",
              "UPS B",
              "Hall 2",
              "<span class=\"tag bad\">P1</span>",
              "cleared 00:02"
            ],
            [
              "Disk 91%",
              "nms-02",
              "Internal",
              "<span class=\"tag ok\">P4</span>",
              "ack"
            ]
          ],
          "hi": 0
        }
      },
      {
        "h": "Alert with context.",
        "p": "An alert carries the rack, the power path, the customer and the SLA clock from the first second. On-call sees who is affected before they pick up.",
        "tags": [
          "SLA clock",
          "Affected customers",
          "On-call"
        ],
        "mock": {
          "type": "form",
          "title": "Alert · inlet high",
          "status": "P1 · 00:38",
          "fields": [
            [
              "Asset",
              "Rack 2B-14 · Hall 2 · row B",
              false
            ],
            [
              "Power path",
              "Feeder 2 → PDU 2B-07",
              false
            ],
            [
              "Customer",
              "Northwind Cloud · NW-117",
              true
            ],
            [
              "SLA",
              "99.99 · breach in 00:22",
              true
            ],
            [
              "On-call",
              "NOC L2 · paged 09:02",
              false
            ],
            [
              "Runbook",
              "RB-14 · Inlet high · CRAH",
              false
            ]
          ],
          "btn": "Open incident"
        }
      },
      {
        "h": "Incident, shared.",
        "p": "One incident in the shared queue. The NOC, facilities and the account team see the same item with the fields their role needs; the customer sees their slice.",
        "tags": [
          "Shared queue",
          "Roles",
          "Customer view"
        ],
        "mock": {
          "type": "timeline",
          "title": "INC-20417",
          "items": [
            [
              "09:02",
              "bad",
              "Opened from alert · NOC L2",
              "Northwind attached · SLA clock running"
            ],
            [
              "09:06",
              "acc",
              "Facilities joined",
              "CRAH C3 inspected · set-point proposed"
            ],
            [
              "09:14",
              "acc",
              "CHG-5531 approved",
              "window 09:30–10:30 · reason kept"
            ],
            [
              "09:48",
              "ok",
              "Inlet clearing · 27.4 °C",
              ""
            ],
            [
              "10:40",
              "ok",
              "Resolved · signed off",
              "breach 38 min · credit queued in Ayana"
            ]
          ]
        }
      },
      {
        "h": "Change, with a window.",
        "p": "Planned and emergency changes with approvals, windows, the assets they touch and the incidents they close. Nothing is edited without a who and a when.",
        "tags": [
          "Approvals",
          "Windows",
          "Assets touched"
        ],
        "mock": {
          "type": "table",
          "title": "Changes · this week",
          "status": "9",
          "cols": [
            "Change",
            "Touches",
            "Window",
            "Approval",
            "State"
          ],
          "rows": [
            [
              "CHG-5531",
              "CRAH C3",
              "Thu 09:30",
              "M. Keller",
              "<span class=\"tag ok\">Done</span>"
            ],
            [
              "CHG-5540",
              "Sw-2C-agg-1 · firmware",
              "Sat 01:00",
              "J. Park",
              "<span class=\"tag acc\">Approved</span>"
            ],
            [
              "CHG-5544",
              "PDU 2B-07 breaker",
              "Thu 09:30",
              "pending",
              "<span class=\"tag warn\">Awaiting</span>"
            ],
            [
              "CHG-5547",
              "Rack 2C-19..24 install",
              "Fri 10:00",
              "L. Moreau",
              "<span class=\"tag acc\">Approved</span>"
            ]
          ],
          "hi": 2
        }
      },
      {
        "h": "Runbooks that run.",
        "p": "Runbooks attached to the asset and the alert type, with the steps, the owners and the checks. Half of them can be executed, not just read.",
        "tags": [
          "Attached to asset",
          "Executable steps"
        ],
        "mock": {
          "type": "timeline",
          "title": "RB-14 · Inlet high · CRAH",
          "items": [
            [
              "Step 1",
              "ok",
              "Confirm reading on second sensor",
              "auto · 41.0 °C · confirmed"
            ],
            [
              "Step 2",
              "ok",
              "Check CRAH C3 status and set-point",
              "auto · running · 22 °C"
            ],
            [
              "Step 3",
              "acc",
              "Propose set-point change → CHG",
              "creates CHG-5531 · needs approval"
            ],
            [
              "Step 4",
              "warn",
              "Notify affected customers",
              "Northwind · portal + email"
            ],
            [
              "Step 5",
              "",
              "Verify inlet < 30 °C for 30 min",
              "pending"
            ]
          ]
        }
      },
      {
        "h": "Report, and prove the SLA.",
        "p": "Availability, MTTR and breaches per customer and contract, computed from the same incidents that produced the credits. The report and the invoice agree.",
        "tags": [
          "Availability",
          "MTTR",
          "Credits"
        ],
        "mock": {
          "type": "kpis",
          "title": "SLA · Northwind · Nov",
          "items": [
            [
              "Availability",
              "99.991%",
              "target 99.99"
            ],
            [
              "Incidents",
              "3",
              "1 × P1"
            ],
            [
              "MTTR",
              "41 min",
              "P1 · 38 min"
            ],
            [
              "Credits",
              "$ 1,120",
              "applied · NW-2026-11"
            ]
          ]
        }
      }
    ],
    "hood_h": "What makes Vitana <em>different.</em>",
    "hood_p": "It is IT operations on the same record as the floor and the contract.",
    "hood": [
      {
        "h": "Context from the first second",
        "p": "Alerts arrive with the rack, the power path, the customer and the SLA clock already attached.",
        "sub": [
          [
            "Affected customers",
            "Known before the call."
          ],
          [
            "SLA clock",
            "Starts on the alert, not the ticket."
          ],
          [
            "Grouping",
            "By asset, not by string match."
          ]
        ]
      },
      {
        "h": "One queue for three teams",
        "p": "Incidents and changes live in DIL. Facilities, the NOC and finance work the same item.",
        "sub": [
          [
            "Roles",
            "The right fields per team."
          ],
          [
            "Customer slice",
            "Their tickets, their changes."
          ],
          [
            "Credits",
            "Queued to Ayana on resolution."
          ]
        ]
      },
      {
        "h": "Nothing without a who and a when",
        "p": "Approvals, windows and overrides are kept. Audit packs and SLA reports come from the same events.",
        "sub": [
          [
            "Attributed",
            "Every edit, every override."
          ],
          [
            "Runbooks",
            "Executable, with checks."
          ],
          [
            "Reports",
            "Agree with the invoice."
          ]
        ]
      }
    ],
    "mid": "Running ServiceNow for the NOC and WhatsApp for facilities? Bring your last P1 and we will show it as one incident on the record.",
    "integ_p": "Keep your monitoring and your ITSM. Vitana reads alerts, writes incidents back, and keeps the chain in DIL.",
    "integ": [
      {
        "h": "ITSM",
        "p": "Two-way incidents and changes.",
        "items": [
          [
            "ServiceNow",
            "servicenow"
          ],
          [
            "Jira Service Management",
            "jira"
          ],
          [
            "Freshservice",
            "freshworks"
          ],
          [
            "BMC Helix",
            null,
            true
          ],
          [
            "ManageEngine",
            null,
            true
          ]
        ]
      },
      {
        "h": "Monitoring",
        "p": "Alerts and metrics in.",
        "items": [
          [
            "Zabbix",
            "zabbix"
          ],
          [
            "Prometheus",
            "prometheus"
          ],
          [
            "Grafana",
            "grafana"
          ],
          [
            "Datadog",
            "datadog"
          ],
          [
            "PRTG",
            null
          ],
          [
            "SolarWinds",
            null,
            true
          ],
          [
            "Nagios",
            "nagios"
          ]
        ]
      },
      {
        "h": "On-call & chat",
        "p": "Where people are paged and talk.",
        "items": [
          [
            "PagerDuty",
            "pagerduty"
          ],
          [
            "Opsgenie",
            "opsgenie"
          ],
          [
            "Slack",
            "slack"
          ],
          [
            "Microsoft Teams",
            null
          ],
          [
            "WhatsApp Business",
            "whatsapp",
            true
          ]
        ]
      },
      {
        "h": "Network & identity",
        "p": "Devices and people.",
        "items": [
          [
            "Cisco",
            "cisco"
          ],
          [
            "Arista",
            null
          ],
          [
            "Juniper",
            "junipernetworks"
          ],
          [
            "Okta",
            "okta"
          ],
          [
            "Microsoft Entra ID",
            null
          ]
        ]
      }
    ],
    "protos": [
      "SNMP traps",
      "Syslog",
      "Webhooks",
      "Email-to-incident",
      "REST"
    ],
    "cta_h": "Bring your last P1. <span>See it as one incident.</span>",
    "cta_p": "Design partner places are open for operators running 2 MW and up."
  },
  "aire": {
    "slug": "aire",
    "title": "Aire · Cloud and GPU on the same record",
    "eyebrow": "04 · Compute · Aire",
    "shape": "cloud",
    "cap": "Aire · Cloud",
    "h1": "Compute that knows <span>which hall it's in.</span>",
    "lede": "Provision, meter and bill GPU and cloud tenants on the same rack, power and customer objects as everything else in the building. One invoice, one record, no second stack.",
    "how_h": "From tenant <em>to invoice.</em>",
    "how_p": "Six moves. The pod, the rack and the kilowatt are the same object the facilities team and finance see.",
    "steps": [
      {
        "h": "Tenant on the record.",
        "p": "A cloud tenant is a customer object in DIL, with its contract in Ayana and its pods on real racks in Neev. Scope and roles follow from that, not from a second directory.",
        "tags": [
          "Customer object",
          "Contract",
          "Real racks"
        ],
        "mock": {
          "type": "cards",
          "title": "Tenant · Halcyon AI",
          "items": [
            [
              "Pod 4 · Hall 3",
              "12 nodes · 96 GPUs",
              "live",
              "ok"
            ],
            [
              "Contract HA-204",
              "committed 420 kW",
              "",
              ""
            ],
            [
              "Network",
              "2 × 400G · VRF 204",
              "",
              ""
            ],
            [
              "Open requests",
              "1 · +4 nodes",
              "capacity check",
              "acc"
            ]
          ]
        }
      },
      {
        "h": "Provision against capacity.",
        "p": "GPU nodes, VMs and bare metal are provisioned only where Neev shows power, cooling and network headroom. A request that the hall cannot carry is caught before a node is racked.",
        "tags": [
          "GPU",
          "Bare metal",
          "VM",
          "Headroom check"
        ],
        "mock": {
          "type": "form",
          "title": "Request · +4 GPU nodes",
          "status": "checked vs floor",
          "fields": [
            [
              "Tenant",
              "Halcyon AI · HA-204",
              false
            ],
            [
              "Pod",
              "Pod 4 · Hall 3 · row D",
              false
            ],
            [
              "Power",
              "Feeder 3 · 156 kW headroom · needs 44",
              true
            ],
            [
              "Cooling",
              "Row D · liquid loop · ok",
              true
            ],
            [
              "Network",
              "Leaf D-07 · 8 ports free",
              true
            ],
            [
              "Lead time",
              "6 days · WO created in Neev",
              false
            ]
          ],
          "btn": "Approve · provision"
        }
      },
      {
        "h": "Network and storage.",
        "p": "VRFs, VLANs, cross-connects and storage volumes attached to the tenant and the rack. The cross-connect on the invoice is the one in the patch panel.",
        "tags": [
          "VRF / VLAN",
          "Cross-connects",
          "Volumes"
        ],
        "mock": {
          "type": "table",
          "title": "Pod 4 · fabric",
          "cols": [
            "Object",
            "Attached to",
            "State"
          ],
          "rows": [
            [
              "VRF 204",
              "Halcyon AI",
              "<span class=\"tag ok\">Up</span>"
            ],
            [
              "Leaf D-07 · ports 1–12",
              "Nodes 01–12",
              "<span class=\"tag ok\">Up</span>"
            ],
            [
              "Cross-connect XC-3-118",
              "Carrier A · MMR 3",
              "<span class=\"tag ok\">Up</span>"
            ],
            [
              "Cross-connect XC-3-121",
              "Carrier B · MMR 3",
              "<span class=\"tag warn\">Provisioning</span>"
            ],
            [
              "Volume vol-204-a · 1.2 PB",
              "Nodes 01–12",
              "<span class=\"tag ok\">Up</span>"
            ]
          ],
          "hi": 3
        }
      },
      {
        "h": "Meter the kilowatt and the hour.",
        "p": "GPU hours, node hours and kilowatt-hours are metered from the same PDUs and the same scheduler, per tenant, per pod. Usage lands on the contract line in Ayana.",
        "tags": [
          "GPU hours",
          "kWh",
          "Per pod"
        ],
        "mock": {
          "type": "bars",
          "title": "Usage · Halcyon · November",
          "items": [
            [
              "GPU hours",
              88,
              "61,440",
              null
            ],
            [
              "Node hours",
              84,
              "7,680",
              null
            ],
            [
              "Power · kWh",
              91,
              "284,120",
              null
            ],
            [
              "Committed kW",
              96,
              "404 of 420",
              "#E9B44C"
            ],
            [
              "Overage",
              6,
              "0",
              null
            ]
          ]
        }
      },
      {
        "h": "Bill through Ayana.",
        "p": "Committed capacity, metered usage, network and storage roll into the tenant's single invoice alongside any colocation they hold. Finance reads it from the ledger they already run.",
        "tags": [
          "One invoice",
          "Committed + metered"
        ],
        "mock": {
          "type": "table",
          "title": "Invoice · HA-2026-11",
          "status": "$ 166k",
          "cols": [
            "Line",
            "Amount",
            "Source"
          ],
          "rows": [
            [
              "Committed capacity · 420 kW",
              "$ 33,264",
              "contract"
            ],
            [
              "GPU hours · 61,440",
              "$ 122,880",
              "Aire meter"
            ],
            [
              "Storage · 1.2 PB",
              "$ 9,600",
              "Aire meter"
            ],
            [
              "Cross-connects · 2",
              "$ 500",
              "contract"
            ],
            [
              "SLA credit",
              "$ 0",
              ""
            ],
            [
              "Total",
              "$ 166,244",
              "to SAP"
            ]
          ],
          "hi": 1
        }
      },
      {
        "h": "Observe like a tenant, operate like the hall.",
        "p": "The tenant sees their pods, utilisation and power. Facilities see the same nodes as load on a feeder. Vitana sees both when something breaks.",
        "tags": [
          "Tenant view",
          "Hall view",
          "Shared incidents"
        ],
        "mock": {
          "type": "kpis",
          "title": "Pod 4 · live",
          "items": [
            [
              "GPU utilisation",
              "87%",
              "96 GPUs"
            ],
            [
              "Power",
              "404 kW",
              "Feeder 3"
            ],
            [
              "Inlet · loop",
              "31 °C",
              "ok"
            ],
            [
              "Incidents · 30 d",
              "1",
              "P3 · link flap"
            ]
          ]
        }
      }
    ],
    "hood_h": "What makes Aire <em>different.</em>",
    "hood_p": "It is a cloud platform that was born inside the data centre record, not bolted onto it.",
    "hood": [
      {
        "h": "Capacity-aware provisioning",
        "p": "Nothing is provisioned where Neev shows no power, cooling or network headroom.",
        "sub": [
          [
            "Headroom check",
            "Per feeder, row and leaf."
          ],
          [
            "Work orders",
            "Racking and cabling created in Neev."
          ],
          [
            "Lead time",
            "Honest, from the floor."
          ]
        ]
      },
      {
        "h": "One meter, one invoice",
        "p": "GPU hours and kilowatt-hours are metered from the same sources and billed on the same invoice as colocation.",
        "sub": [
          [
            "Per tenant, per pod",
            "Usage lands on contract lines."
          ],
          [
            "Committed + metered",
            "Both bases, one bill."
          ],
          [
            "Finance stays put",
            "Posts to the ledger."
          ]
        ]
      },
      {
        "h": "Two views of the same node",
        "p": "A node is load on a feeder to facilities and a GPU to the tenant. Incidents are shared across both.",
        "sub": [
          [
            "Tenant scope",
            "Their pods, nothing else."
          ],
          [
            "Shared incidents",
            "Vitana, with the rack attached."
          ],
          [
            "Audit",
            "Who provisioned what, when."
          ]
        ]
      }
    ],
    "mid": "Hosting a neocloud, or becoming one? Bring your scheduler and your PDU list and we will show one tenant metered end to end.",
    "integ_p": "Aire orchestrates what you run and meters what the floor sees. Bring your hypervisor, your scheduler and your fabric.",
    "integ": [
      {
        "h": "Virtualisation & orchestration",
        "p": "Where workloads are placed.",
        "items": [
          [
            "Kubernetes",
            "kubernetes"
          ],
          [
            "Slurm",
            null
          ],
          [
            "VMware vSphere",
            "vmware"
          ],
          [
            "OpenStack",
            "openstack"
          ],
          [
            "Proxmox",
            "proxmox"
          ],
          [
            "Terraform",
            "terraform"
          ]
        ]
      },
      {
        "h": "Accelerators & servers",
        "p": "What the pods are made of.",
        "items": [
          [
            "NVIDIA",
            "nvidia"
          ],
          [
            "AMD",
            "amd"
          ],
          [
            "Dell",
            "dell"
          ],
          [
            "Supermicro",
            null
          ],
          [
            "HPE",
            "hp",
            true
          ],
          [
            "Lenovo",
            "lenovo",
            true
          ]
        ]
      },
      {
        "h": "Network & storage",
        "p": "The fabric and the volumes.",
        "items": [
          [
            "Cisco",
            "cisco"
          ],
          [
            "Arista",
            null
          ],
          [
            "Juniper",
            "junipernetworks"
          ],
          [
            "NVIDIA Spectrum",
            "nvidia"
          ],
          [
            "Ceph",
            "ceph"
          ],
          [
            "NetApp",
            "netapp"
          ],
          [
            "VAST Data",
            null,
            true
          ]
        ]
      },
      {
        "h": "Billing & identity",
        "p": "Through Ayana and your SSO.",
        "items": [
          [
            "Ayana",
            null
          ],
          [
            "SAP",
            "sap"
          ],
          [
            "Oracle NetSuite",
            "oracle"
          ],
          [
            "Okta",
            "okta"
          ],
          [
            "Keycloak",
            "keycloak"
          ]
        ]
      }
    ],
    "protos": [
      "Redfish",
      "IPMI",
      "SNMP",
      "Prometheus exporters",
      "OpenTelemetry",
      "REST"
    ],
    "cta_h": "One tenant, <span>metered end to end.</span>",
    "cta_p": "Design partner places are open for operators hosting GPU or cloud tenants."
  }
} as const;
