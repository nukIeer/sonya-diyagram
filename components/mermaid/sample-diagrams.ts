export const sampleDiagrams = {
  layered: `graph TD
  %% Define the layers
  subgraph layer-1[" "]
    ProjectTitle["Sonya Topluluğu - Türkiye Deprem İzleme Sistemi<br/><small>TDIS API & Open Source</small>"]:::projectTitle
  end
  
  subgraph layer-2[" "]
    ProjeLideri["Furkan Zihni Özen - Proje Lideri<br/><small>• Proje yönetimi ve stratejik planlama<br/>• Topluluk yönetimi ve mentorluk<br/>• Teknik içerik üretimi ve iletişim</small>"]:::leader
  end
  
  subgraph layer-3[" "]
    ProjeKoordinatoru["Nuh Hatipoğlu - Proje Koordinatörü<br/><small>• Günlük operasyonların yönetimi<br/>• Ekip koordinasyonu ve iletişim<br/>• Asana ile proje takibi</small>"]:::coordinator
  end
  
  subgraph layer-4[" "]
    BackendLideri["Melike Kara - Backend Takım Lideri<br/><small>• Backend ekibinin yönetimi<br/>• Teknik kararların alınması<br/>• Kod kalitesi ve standartların belirlenmesi</small>"]:::teamLead
    BackendDanismani["Ömer Talha Acet - Backend Danışmanı<br/><small>• Teknik danışmanlık ve mentorluk<br/>• Kod review ve best practice önerileri<br/>• Esnek çalışma saatleri ile destek</small>"]:::advisor
    FrontendLideri["Sena Nur Özcan - Frontend Takım Lideri<br/><small>• Frontend ekibinin yönetimi<br/>• UI/UX standartlarının belirlenmesi<br/>• Kullanıcı deneyimi optimizasyonu</small>"]:::teamLead
  end
  
  %% Connections between layers
  ProjectTitle --> ProjeLideri
  ProjeLideri --> ProjeKoordinatoru
  ProjeKoordinatoru --> BackendLideri
  ProjeKoordinatoru --> BackendDanismani
  ProjeKoordinatoru --> FrontendLideri
  
  %% Styling
  classDef projectTitle fill:url(#gradient-title),stroke:#6366f1,stroke-width:2px,color:white,font-weight:bold;
  classDef leader fill:url(#gradient-leader),stroke:#8b5cf6,stroke-width:2px,color:white,font-weight:bold;
  classDef coordinator fill:url(#gradient-coordinator),stroke:#ec4899,stroke-width:2px,color:white;
  classDef teamLead fill:url(#gradient-teamlead),stroke:#06b6d4,stroke-width:2px,color:white;
  classDef advisor fill:url(#gradient-advisor),stroke:#f59e0b,stroke-width:2px,color:white;
  
  %% Layer styling
  classDef layer-1-style fill:rgba(79,70,229,0.1),stroke:none,color:white,rx:15,ry:15;
  classDef layer-2-style fill:rgba(139,92,246,0.1),stroke:none,color:white,rx:15,ry:15;
  classDef layer-3-style fill:rgba(236,72,153,0.1),stroke:none,color:white,rx:15,ry:15;
  classDef layer-4-style fill:rgba(6,182,212,0.1),stroke:none,color:white,rx:15,ry:15;
  
  class layer-1 layer-1-style;
  class layer-2 layer-2-style;
  class layer-3 layer-3-style;
  class layer-4 layer-4-style;`,

  complex: `graph TD
  %% Define the layers
  subgraph layer-1[" "]
    ProjectTitle["Sonya Topluluğu - Türkiye Deprem İzleme Sistemi<br/><small>TDIS API & Open Source</small>"]:::projectTitle
  end
  
  subgraph layer-2[" "]
    ProjeLideri["Furkan Zihni Özen - Proje Lideri<br/><small>• Proje yönetimi ve stratejik planlama<br/>• Topluluk yönetimi ve mentorluk<br/>• Teknik içerik üretimi ve iletişim</small>"]:::leader
  end
  
  subgraph layer-3[" "]
    ProjeKoordinatoru["Nuh Hatipoğlu - Proje Koordinatörü<br/><small>• Günlük operasyonların yönetimi<br/>• Ekip koordinasyonu ve iletişim<br/>• Asana ile proje takibi</small>"]:::coordinator
  end
  
  subgraph layer-4[" "]
    BackendLideri["Melike Kara - Backend Takım Lideri<br/><small>• Backend ekibinin yönetimi<br/>• Teknik kararların alınması<br/>• Kod kalitesi ve standartların belirlenmesi</small>"]:::teamLead
    BackendDanismani["Ömer Talha Acet - Backend Danışmanı<br/><small>• Teknik danışmanlık ve mentorluk<br/>• Kod review ve best practice önerileri<br/>• Esnek çalışma saatleri ile destek</small>"]:::advisor
    FrontendLideri["Sena Nur Özcan - Frontend Takım Lideri<br/><small>• Frontend ekibinin yönetimi<br/>• UI/UX standartlarının belirlenmesi<br/>• Kullanıcı deneyimi optimizasyonu</small>"]:::teamLead
    VeriBilimiLideri["Orhan Murat Tuncer - Veri Bilimi Lideri<br/><small>• Veri analizi ve modelleme ekibinin yönetimi<br/>• Makine öğrenmesi stratejilerinin belirlenmesi<br/>• Deprem veri analizi ve tahmin sistemleri</small>"]:::teamLead
    YapayZekaLideri["Şeyda Öksüzoğlu - Yapay Zeka Takım Lideri<br/><small>• AI model geliştirme ve eğitimi<br/>• Deprem tahmin sistemlerinin geliştirilmesi<br/>• Model optimizasyonu ve performans takibi</small>"]:::teamLead
  end
  
  %% Connections between layers
  ProjectTitle --> ProjeLideri
  ProjeLideri --> ProjeKoordinatoru
  ProjeKoordinatoru --> BackendLideri
  ProjeKoordinatoru --> BackendDanismani
  ProjeKoordinatoru --> FrontendLideri
  ProjeKoordinatoru --> VeriBilimiLideri
  ProjeKoordinatoru --> YapayZekaLideri
  
  %% Styling
  classDef projectTitle fill:url(#gradient-title),stroke:#6366f1,stroke-width:2px,color:white,font-weight:bold;
  classDef leader fill:url(#gradient-leader),stroke:#8b5cf6,stroke-width:2px,color:white,font-weight:bold;
  classDef coordinator fill:url(#gradient-coordinator),stroke:#ec4899,stroke-width:2px,color:white;
  classDef teamLead fill:url(#gradient-teamlead),stroke:#06b6d4,stroke-width:2px,color:white;
  classDef advisor fill:url(#gradient-advisor),stroke:#f59e0b,stroke-width:2px,color:white;
  
  %% Layer styling
  classDef layer-1-style fill:rgba(79,70,229,0.1),stroke:none,color:white,rx:15,ry:15;
  classDef layer-2-style fill:rgba(139,92,246,0.1),stroke:none,color:white,rx:15,ry:15;
  classDef layer-3-style fill:rgba(236,72,153,0.1),stroke:none,color:white,rx:15,ry:15;
  classDef layer-4-style fill:rgba(6,182,212,0.1),stroke:none,color:white,rx:15,ry:15;
  
  class layer-1 layer-1-style;
  class layer-2 layer-2-style;
  class layer-3 layer-3-style;
  class layer-4 layer-4-style;`,

  flowchart: `graph TD
  %% Define the layers
  subgraph layer-1[" "]
    A[Start]:::start
  end
  
  subgraph layer-2[" "]
    B{Is it working?}:::decision
  end
  
  subgraph layer-3[" "]
    C[Great!]:::success
    D[Debug]:::warning
  end
  
  %% Connections between layers
  A --> B
  B -->|Yes| C
  B -->|No| D
  D --> B
  
  %% Styling
  classDef start fill:url(#gradient-title),stroke:#6366f1,stroke-width:2px,color:white,font-weight:bold;
  classDef decision fill:url(#gradient-leader),stroke:#8b5cf6,stroke-width:2px,color:white;
  classDef success fill:url(#gradient-teamlead),stroke:#06b6d4,stroke-width:2px,color:white;
  classDef warning fill:url(#gradient-advisor),stroke:#f59e0b,stroke-width:2px,color:white;
  
  %% Layer styling
  classDef layer-1-style fill:rgba(79,70,229,0.1),stroke:none,color:white,rx:15,ry:15;
  classDef layer-2-style fill:rgba(139,92,246,0.1),stroke:none,color:white,rx:15,ry:15;
  classDef layer-3-style fill:rgba(236,72,153,0.1),stroke:none,color:white,rx:15,ry:15;
  
  class layer-1 layer-1-style;
  class layer-2 layer-2-style;
  class layer-3 layer-3-style;`,

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
