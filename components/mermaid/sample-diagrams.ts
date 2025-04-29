export const sampleDiagrams = {
  simple: `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    
    %% Styling
    classDef default fill:#121212,stroke:#6366f1,stroke-width:2px,color:white;
    classDef success fill:#121212,stroke:#10b981,stroke-width:2px,color:white;
    
    class C success;`,

  layered: `graph TD
  %% Define the layers
  subgraph layer-1[" "]
    ProjectTitle["Project Title<br/><small>Description</small>"]:::projectTitle
  end
  
  subgraph layer-2[" "]
    Manager["Project Manager<br/><small>• Project management<br/>• Team coordination<br/>• Resource planning</small>"]:::leader
  end
  
  subgraph layer-3[" "]
    TeamLead1["Frontend Team Lead<br/><small>• UI/UX development<br/>• Component design<br/>• Client-side logic</small>"]:::teamLead
    TeamLead2["Backend Team Lead<br/><small>• API development<br/>• Database design<br/>• Server infrastructure</small>"]:::teamLead
  end
  
  %% Connections between layers
  ProjectTitle --> Manager
  Manager --> TeamLead1
  Manager --> TeamLead2
  
  %% Styling
  classDef projectTitle fill:#121212,stroke:#6366f1,stroke-width:2px,color:white,font-weight:bold;
  classDef leader fill:#121212,stroke:#8b5cf6,stroke-width:2px,color:white,font-weight:bold;
  classDef teamLead fill:#121212,stroke:#06b6d4,stroke-width:2px,color:white;
  
  %% Layer styling
  classDef layer-1-style fill:rgba(79,70,229,0.1),stroke:none,color:white,rx:15,ry:15;
  classDef layer-2-style fill:rgba(139,92,246,0.1),stroke:none,color:white,rx:15,ry:15;
  classDef layer-3-style fill:rgba(236,72,153,0.1),stroke:none,color:white,rx:15,ry:15;
  
  class layer-1 layer-1-style;
  class layer-2 layer-2-style;
  class layer-3 layer-3-style;`,

  flowchart: `graph TD
    A[Start] --> B{Decision?}
    B -->|Option 1| C[Result 1]
    B -->|Option 2| D[Result 2]
    C --> E[End]
    D --> E
    
    %% Styling
    classDef default fill:#121212,stroke:#6366f1,stroke-width:2px,color:white;
    classDef end fill:#121212,stroke:#ec4899,stroke-width:2px,color:white;
    
    class E end;`,

  sequence: `sequenceDiagram
    participant User
    participant API
    participant DB
    
    User->>+API: Request Data
    API->>+DB: Query Database
    Note right of DB: Processing query
    DB-->>-API: Return Results
    API-->>-User: Display Data`,
}
