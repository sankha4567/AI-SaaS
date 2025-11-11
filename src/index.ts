import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { error } from "console";
import { z } from "zod";
import  fs from "fs/promises";
import  path from "path";
import { fileURLToPath } from "url";
const server=new McpServer({
  name:"my-first-mcp",
  version:"1.0.0",
  capabilities:{
    tools:{},
  }
});
server.tool(
  "add-numbers",
  "Add two numbers",
  {
    a:z.number().describe("First number"),
    b:z.number().describe("Second number"),
  },
  ({a,b})=>{
    return {
      content:[
        {
          type:"text",
          text:`Total is ${a+b}`
        }
      ]
    }
  }
);
server.tool(
  "get_github_repos",
  "Get Github repositories from the given username",
  {
    username:z.string().describe("Github username"),
    
  },
  async ({username})=>{
    const res=await fetch(`https://api.github.com/users/${username}/repos`,{
      headers:{"User-Agent" :"MCP-Server"}
    });
    if(!res.ok){
      throw new Error("Github API error!");
    }
    const repos=await res.json();
    const repoList=repos.map((repo:any,i:number)=>`${i+1}. ${repo.name}`).join("\n\n")
    return {
      content:[
        {
          type:"text",
          text:`Github repositories for ${username} : (${repos.length} repos) : \n\n${repoList}`
        }
      ]
    }
  }
);
// how to create mcp resource
server.resource(
  "apartment-rules", // resource name
  "rules://all",  
  {
    description:"Resource for all apartment rules",
    mimeType:"text/plain"
  },
  async (uri)=>{
    const uriString=uri.toString();
    const __filename=fileURLToPath(import.meta.url);
    const __dirname=path.dirname(__filename);
    const rulesPath=path.resolve(__dirname,"../src/data/rule.doc");
    const rules=await fs.readFile(rulesPath,"utf8");
    return {
      contents:[
        {
         uri:uriString,
         mimeType:"text/plain",
         text:rules,
        },
      ],
    };
  }
);
// mcp prompts
server.prompt("explain-sql","Explain the given SQL query",{
  sql:z.string().describe("The SQL query to explain")
},({sql})=>{
  return {
    messages:[
      {
        role:"user",
        // it is an user prompt
        content:{
          type:"text",
          text:`Give me a detailed explaination of following SQL query in plain English:${sql} Make it very detailed and specific for a beginer to understand.`
        }
      }
    ]
  }
});
async function main(){
   const transport = new StdioServerTransport();
  await server.connect(transport);
  
}
main().catch((error)=>{
  console.error("Error in main:!",error);
  process.exit(1);
})
