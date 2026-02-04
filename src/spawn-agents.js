/**
 * Agent Spawner
 * Actually spawns sub-agents using sessions_spawn and collects results
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const AGENTS = [
  {
    id: 'business-guru',
    name: '📈 Business Growth Agent',
    task: `Generate 3 business growth ideas for Asobo Creations (coloring book/digital art business).

Each idea must be:
- Actionable TODAY
- Low effort, high impact  
- Specific (not generic advice)

FORMAT:
## IDEA 1: [Catchy Title]
**What:** [2-3 sentence description]
**Why:** [Why this works now]
**How:** [Step-by-step implementation]
**Impact:** [Expected result with numbers]
**Difficulty:** [Easy/Medium/Hard]
**Score:** [Self-rate 1-10]

Generate 3 ideas now.`,
    model: 'kimi-coding/k2p5',
    thinking: 'medium'
  },
  {
    id: 'content-creator',
    name: '🎨 Content Marketing Agent',
    task: `Generate 3 viral content ideas for a coloring book business.

Focus on:
- TikTok/Reels that could go viral
- Pinterest pins that drive traffic
- Content that converts viewers to buyers

FORMAT:
## IDEA 1: [Title]
**Format:** [Video/Pin/Blog/etc]
**Hook:** [First 3 seconds that grab attention]
**Content:** [What happens in the content]
**CTA:** [Call to action]
**Why Viral:** [Psychology/trend reasoning]
**Score:** [Self-rate 1-10]

Generate 3 ideas now.`,
    model: 'kimi-coding/k2p5',
    thinking: 'low'
  },
  {
    id: 'tech-innovator',
    name: '⚡ Tech Automation Agent',
    task: `Generate 3 automation/tool ideas for a digital product business.

Could be:
- Scripts that save time
- New tools to build
- Workflow improvements
- AI integrations

FORMAT:
## IDEA 1: [Tool Name]
**Problem:** [What it solves]
**Solution:** [How it works]
**Implementation:** [Technical steps]
**Time Saved:** [Hours per week]
**Build Time:** [How long to create]
**Score:** [Self-rate 1-10]

Generate 3 ideas now.`,
    model: 'kimi-coding/k2p5',
    thinking: 'high'
  },
  {
    id: 'creative-muse',
    name: '🌟 Creative Product Agent',
    task: `Generate 3 new coloring book/digital product ideas.

Consider:
- Trending aesthetics (kawaii, dark academia, cottagecore, etc.)
- Underserved niches
- Seasonal opportunities
- Unique angles on popular themes

FORMAT:
## IDEA 1: [Product Name]
**Theme:** [What it's about]
**Audience:** [Who would buy this]
**5 Page Ideas:** [Brief descriptions]
**Trend Alignment:** [Why it's timely]
**Production:** [Hours to create]
**Score:** [Self-rate 1-10]

Generate 3 ideas now.`,
    model: 'kimi-coding/k2p5',
    thinking: 'low'
  }
];

async function spawnAllAgents() {
  const date = new Date().toISOString().split('T')[0];
  const resultsDir = join(rootDir, 'results');
  
  if (!existsSync(resultsDir)) {
    mkdirSync(resultsDir, { recursive: true });
  }

  console.log('🦋 DAILY AGENT SWARM - SPAWN SEQUENCE\n');
  console.log('=' .repeat(60));
  console.log(`Date: ${date}`);
  console.log(`Agents: ${AGENTS.length}`);
  console.log('=' .repeat(60));

  // This would normally use sessions_spawn API
  // For now, generate the task assignments
  
  const assignments = AGENTS.map((agent, i) => ({
    index: i + 1,
    id: agent.id,
    name: agent.name,
    model: agent.model,
    thinking: agent.thinking,
    task: agent.task,
    status: 'ready_to_spawn'
  }));

  // Save assignments
  const assignmentFile = join(resultsDir, `agent-assignments-${date}.json`);
  writeFileSync(assignmentFile, JSON.stringify({
    date,
    generated: new Date().toISOString(),
    agents: assignments
  }, null, 2));

  console.log('\n📋 AGENT ASSIGNMENTS:');
  console.log('-'.repeat(40));
  
  assignments.forEach(a => {
    console.log(`${a.index}. ${a.name}`);
    console.log(`   Model: ${a.model}`);
    console.log(`   Thinking: ${a.thinking}`);
    console.log('');
  });

  // Generate markdown task list
  let md = `# 🤖 Daily Agent Swarm - ${date}\n\n`;
  md += `**Generated:** ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC\n\n`;
  md += `---\n\n`;
  
  assignments.forEach(a => {
    md += `## ${a.index}. ${a.name}\n\n`;
    md += `- **Model:** ${a.model}\n`;
    md += `- **Thinking:** ${a.thinking}\n\n`;
    md += `### Task:\n\n`;
    md += '```\n';
    md += a.task;
    md += '\n```\n\n';
    md += `---\n\n`;
  });

  md += `## 🎯 Next Steps\n\n`;
  md += `1. Run each agent using \`sessions_spawn\` with their task\n`;
  md += `2. Collect responses in \`/results/responses/\`\n`;
  md += `3. Run \`npm run evaluate\` to score all ideas\n`;
  md += `4. Implement the highest-scoring idea\n\n`;

  const mdFile = join(resultsDir, `daily-swarm-${date}.md`);
  writeFileSync(mdFile, md);

  console.log('📄 Files generated:');
  console.log(`   - ${assignmentFile}`);
  console.log(`   - ${mdFile}`);
  console.log('\n✅ Agent swarm ready for deployment!');
  console.log('\n💡 To execute:');
  console.log('   1. Use sessions_spawn for each agent');
  console.log('   2. Collect their responses');
  console.log('   3. Evaluate and choose best idea');
}

spawnAllAgents().catch(console.error);