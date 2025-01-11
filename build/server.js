"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"));
var import_zod = __toESM(require("zod"));
var app = (0, import_express.default)();
var PORT = 3333;
app.use(import_express.default.json());
app.post("/add", async (req, res) => {
  const requestBodySchema = import_zod.default.object({
    id: import_zod.default.number(),
    titulo: import_zod.default.string(),
    coletada: import_zod.default.string()
  });
  const { id, titulo, coletada } = requestBodySchema.parse(req.body);
  const url = "https://api.notion.com/v1/pages";
  const data = {
    parent: {
      database_id: "cdbcdd4b58e1403f8cafe200a7deda82"
    },
    icon: {
      emoji: "\u{1F96C}"
    },
    cover: {
      external: {
        url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg"
      }
    },
    properties: {
      id_issue: {
        number: id
      },
      titulo: {
        title: [
          {
            text: {
              content: titulo
            }
          }
        ]
      },
      coletada: {
        date: {
          start: coletada
        }
      }
    }
  };
  try {
    const responseNotion = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify(data)
    });
    if (!responseNotion.ok) {
      const responseData2 = await responseNotion.json();
      res.status(400).json(responseData2);
    }
    const responseData = await responseNotion.json();
    res.status(201).json(responseData);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.listen(PORT, () => {
  console.log("Server is running");
});
