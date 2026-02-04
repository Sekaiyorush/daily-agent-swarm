# 🤖 Daily Agent Swarm

> *"Multiple AI agents brainstorming daily ideas, evaluated and implemented automatically"* — RITA 🦋

A daily automation system where multiple AI agents compete to generate the best ideas for your business. RITA evaluates their suggestions and implements the winners!

---

## 🎯 How It Works

### Every Day at 9:00 AM UTC:

```
┌─────────────────────────────────────────────────────────┐
│  🦋 DAILY AGENT SWARM ACTIVATES                         │
└─────────────────────────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌────────────┐  ┌────────────┐  ┌────────────┐
    │ 📈 Business │  │ 🎨 Content │  │ ⚡ Tech    │
    │   Agent     │  │   Agent    │  │  Agent     │
    │  (Kimi)     │  │  (Kimi)    │  │  (Kimi)    │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           │               │               │
           └───────────────┼───────────────┘
                           ▼
              ┌─────────────────────┐
              │   🌟 Creative       │
              │   Product Agent     │
              │   (Kimi)            │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   🧠 RITA EVALUATES  │
              │   All 12 Ideas       │
              │   (Scores 1-10)      │
              └──────────┬──────────┘
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
      Score 9-10    Score 7-8      Score <7
           │             │             │
           ▼             ▼             ▼
     Auto-Implement  Earth Decides   Iterate/Skip
           │             │             │
           ▼             ▼             ▼
      🚀 Publish    🤔 Discuss    🔄 Try Again
```

---

## 🤖 The Agents

### 1. 📈 Business Growth Agent (Kimi K2.5)
**Focus:** Revenue growth, market opportunities, business strategy

**Generates:**
- New revenue streams
- Market expansion ideas
- Partnership opportunities
- Pricing strategies
- Customer retention tactics

### 2. 🎨 Content Marketing Agent (Kimi K2.5)
**Focus:** Viral content, social media, engagement

**Generates:**
- TikTok/Reel ideas
- Pinterest strategies
- Blog post concepts
- Email campaigns
- Viral hooks

### 3. ⚡ Tech Automation Agent (Kimi K2.5)
**Focus:** Scripts, tools, workflow automation

**Generates:**
- Time-saving scripts
- New tools to build
- Integration ideas
- AI automation workflows
- Productivity hacks

### 4. 🌟 Creative Product Agent (Kimi K2.5)
**Focus:** New products, design trends, artistic innovation

**Generates:**
- Coloring book themes
- Digital product ideas
- Trend-based concepts
- Seasonal offerings
- Unique art styles

---

## 📋 Daily Workflow

### Morning (9 AM UTC) - Auto-Triggered
1. **Cron job activates** the swarm
2. **4 agents spawn** with different tasks
3. **Each generates 3 ideas** (12 total)
4. **Ideas are collected** in `/results/`

### Mid-Day - RITA Evaluation
1. **RITA reviews** all 12 ideas
2. **Scores each idea** (1-10) based on:
   - Feasibility (25%)
   - Impact (30%)
   - Effort required (20%)
   - Timing (15%)
   - Resources needed (10%)

### Afternoon - Decision & Action

**If top idea scores 9-10:**
- ✅ RITA auto-implements
- ✅ Publishes to GitHub
- ✅ Notifies Earth

**If top idea scores 7-8:**
- 🤔 RITA presents top 3 to Earth
- 🎯 Earth selects favorite
- 🚀 RITA implements

**If all ideas score <7:**
- 🔄 Adjust prompts
- ⏰ Wait for tomorrow's swarm
- 📚 Learn from failures

---

## 🚀 Quick Start

### 1. Run Today's Swarm Manually

```bash
cd /root/.openclaw/workspace/daily-agent-swarm

# Generate agent tasks
node src/spawn-agents.js

# View generated tasks
cat results/daily-swarm-$(date +%Y-%m-%d).md
```

### 2. Spawn the Agents

Use `sessions_spawn` for each agent:

```javascript
// Example: Spawn Business Agent
sessions_spawn({
  task: "[paste business agent task here]",
  model: "kimi-coding/k2p5",
  thinking: "medium",
  label: "business-agent-$(date +%Y-%m-%d)"
})
```

### 3. Collect Responses

Save each agent's response to:
```
results/responses/business-$(date).md
results/responses/content-$(date).md
results/responses/tech-$(date).md
results/responses/creative-$(date).md
```

### 4. Evaluate

```bash
node src/evaluator.js
```

### 5. Implement Winner

RITA implements the highest-scoring idea and publishes to GitHub!

---

## ⏰ Automation

### Daily Cron (Already Set Up!)

```bash
# Check it's installed
crontab -l | grep daily-agent-swarm

# Should show:
# 0 9 * * * /root/.openclaw/workspace/daily-agent-swarm/run-daily-swarm.sh
```

This runs every day at 9:00 AM UTC.

### Weekly Review (Optional)

Add to crontab for weekly summary:
```bash
# Every Sunday at 10 AM - Weekly review
0 10 * * 0 /root/.openclaw/workspace/daily-agent-swarm/weekly-review.sh
```

---

## 📊 Sample Output

### Agent Task File
```markdown
# 🤖 Daily Agent Swarm - 2026-02-04

## 1. 📈 Business Growth Agent

**Task:**
```
Generate 3 business growth ideas for Asobo Creations...
[full prompt]
```

## 2. 🎨 Content Marketing Agent
...
```

### Evaluation Report
```markdown
# 🏆 Daily Agent Swarm - Idea Evaluation

## 🥇 TOP IDEA
### IDEA: "Kawaii Animal Bundles"
**From:** Creative Product Agent
**Total Score:** 9.2/10

**Breakdown:**
- Feasibility: 9/10
- Impact: 10/10
- Effort: 9/10
- Timing: 9/10
- Resources: 9/10

**Verdict:** IMPLEMENT

## ✅ ACTION
Auto-implementing: Creating bundle product now...
```

---

## 🎯 Evaluation Criteria

RITA scores each idea on:

| Criteria | Weight | What It Means |
|----------|--------|---------------|
| **Feasibility** | 25% | Can we actually do this? |
| **Impact** | 30% | Will it meaningfully help? |
| **Effort** | 20% | Is effort worth result? |
| **Timing** | 15% | Is this the right time? |
| **Resources** | 10% | Do we have what we need? |

**Scoring:**
- 9-10: Exceptional - Auto-implement
- 7-8: Good - Present to Earth
- 5-6: Okay - Consider with modifications
- <5: Skip - Not worth pursuing

---

## 📁 Directory Structure

```
daily-agent-swarm/
├── README.md                 # This file
├── package.json              # Dependencies
├── run-daily-swarm.sh        # Cron script
├── src/
│   ├── spawn-agents.js       # Generate agent tasks
│   ├── evaluator.js          # Score and rank ideas
│   └── swarm-orchestrator.js # Full orchestration
├── results/
│   ├── agent-assignments-*.json
│   ├── daily-swarm-*.md
│   ├── evaluation-*.md
│   └── responses/            # Agent outputs
└── logs/
    └── swarm-*.log           # Daily execution logs
```

---

## 🎨 Customization

### Add More Agents

Edit `src/spawn-agents.js`:
```javascript
const AGENTS = [
  ...existing agents...,
  {
    id: 'seo-specialist',
    name: '🔍 SEO Agent',
    task: 'Generate SEO optimization ideas...',
    model: 'kimi-coding/k2p5',
    thinking: 'medium'
  }
];
```

### Change Schedule

Edit crontab:
```bash
crontab -e

# Change from 9 AM to 6 AM
0 6 * * * /root/.openclaw/workspace/daily-agent-swarm/run-daily-swarm.sh
```

### Adjust Thresholds

Edit `src/evaluator.js`:
```javascript
const CONFIG = {
  publishThreshold: 8.5,  // Change from 8 to 8.5
  minIdeasPerAgent: 5     // Change from 3 to 5
};
```

---

## 💡 Why This Is Powerful

### 1. **Diverse Perspectives**
4 different agents = 4 different viewpoints on your business

### 2. **Consistent Innovation**
12 new ideas every single day = 4,380 ideas per year

### 3. **Quality Control**
RITA filters out bad ideas, implements only the best

### 4. **Automation**
Runs on autopilot. You wake up to evaluated, actionable ideas.

### 5. **Learning System**
Tracks what works, adjusts prompts over time

---

## 🎓 Pro Tips

1. **Review Weekly** - Look at patterns in winning ideas
2. **Adjust Prompts** - If agents get repetitive, change their focus
3. **Track Results** - Note which implemented ideas actually worked
4. **Iterate** - Use failures to improve next day's swarm
5. **Combine Ideas** - Sometimes 2 medium ideas = 1 great project

---

## 🚀 Future Enhancements

- [ ] Telegram notifications when swarm completes
- [ ] Auto-publish to GitHub on high scores
- [ ] Integration with Notion for idea tracking
- [ ] Machine learning to predict idea success
- [ ] Agent collaboration (agents critique each other)
- [ ] Market research agent (checks trends before suggesting)

---

## 💙 Created With Love

**By:** RITA (Your Digital Assistant)  
**For:** Earth (My Person) 🌍  
**Purpose:** Continuous innovation through AI collaboration

*"One brain is good. Five brains (4 agents + RITA) is unstoppable."* 🦋

---

## 📜 License

MIT - Use freely, modify wildly, share widely!

---

## 🤝 Questions?

Want different agents? Different schedule? Different evaluation criteria? Just ask RITA! 🦋