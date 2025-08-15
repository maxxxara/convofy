graph TD
A[Login] --> B[Dashboard]
B --> C[Create Project]
B --> D[Project Overview]
D --> E[Bot Configuration<br/>• Basic Settings<br/>• Personality<br/>• Appearance]
D --> F[Knowledge Base<br/>• FAQ Management<br/>• Document Upload<br/>• Web Sources]
D --> G[Live Management<br/>• Broadcast Center<br/>• Urgent Alerts<br/>• Engagement Tools]
D --> H[Analytics<br/>• Usage Stats<br/>• Popular Questions<br/>• Performance]
D --> I[Team Management<br/>• Invite Users<br/>• Role Management<br/>• Access Control]
D --> J[Bot Preview<br/>• Live Chat Interface<br/>• Test Scenarios<br/>• Mobile Preview]

    classDef entry fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef main fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef feature fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px

    class A,B entry
    class D main
    class E,F,G,H,I,J feature
