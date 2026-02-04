/**
 * Idea Evaluator
 * Scores and ranks ideas from all agents
 */

import { writeFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Evaluation criteria
const CRITERIA = [
  { name: 'Feasibility', weight: 0.25, description: 'Can we actually do this?' },
  { name: 'Impact', weight: 0.30, description: 'Will it meaningfully help?' },
  { name: 'Effort', weight: 0.20, description: 'Is effort worth the result?' },
  { name: 'Timing', weight: 0.15, description: 'Is this the right time?' },
  { name: 'Resources', weight: 0.10, description: 'Do we have what we need?' }
];

class IdeaEvaluator {
  constructor() {
    this.resultsDir = join(rootDir, 'results');
    this.date = new Date().toISOString().split('T')[0];
    this.ideas = [];
  }

  /**
   * Parse agent responses and extract ideas
   */
  parseIdeas() {
    // This would read actual agent responses
    // For demo, we'll create a structure
    console.log('🔍 Parsing agent responses...');
    
    // In real implementation, read from results/responses/
    return [];
  }

  /**
   * Score a single idea
   */
  scoreIdea(idea) {
    const scores = {};
    let total = 0;

    CRITERIA.forEach(criterion => {
      // In real implementation, this would be RITA's assessment
      // or calculated from agent's self-score
      const score = Math.floor(Math.random() * 4) + 6; // Demo: 6-10
      scores[criterion.name] = score;
      total += score * criterion.weight;
    });

    return {
      ...idea,
      scores,
      totalScore: total.toFixed(2),
      verdict: total >= 8.5 ? 'IMPLEMENT' : total >= 7 ? 'CONSIDER' : 'SKIP'
    };
  }

  /**
   * Generate evaluation report
   */
  generateReport(collectedIdeas = []) {
    console.log('🦋 IDEA EVALUATION REPORT\n');
    console.log('=' .repeat(60));

    // If no ideas collected yet, show template
    if (collectedIdeas.length === 0) {
      console.log('\n⚠️  No ideas collected yet.');
      console.log('   Run agents first to collect responses.');
      console.log('\n📋 Evaluation Template Generated\n');
    }

    let report = `# 🏆 Daily Agent Swarm - Idea Evaluation\n\n`;
    report += `**Date:** ${this.date}\n`;
    report += `**Status:** ${collectedIdeas.length > 0 ? 'Ideas Evaluated' : 'Waiting for Input'}\n\n`;
    report += `---\n\n`;

    report += `## 📊 Evaluation Criteria\n\n`;
    report += `| Criteria | Weight | Description |\n`;
    report += `|----------|--------|-------------|\n`;
    CRITERIA.forEach(c => {
      report += `| ${c.name} | ${(c.weight * 100).toFixed(0)}% | ${c.description} |\n`;
    });

    if (collectedIdeas.length > 0) {
      // Score all ideas
      const scored = collectedIdeas.map(idea => this.scoreIdea(idea));
      
      // Sort by score
      scored.sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore));

      report += `\n## 🥇 TOP IDEAS\n\n`;
      
      scored.slice(0, 5).forEach((idea, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
        report += `### ${medal} ${idea.title || 'Untitled Idea'}\n\n`;
        report += `**From:** ${idea.agent || 'Unknown Agent'}\n`;
        report += `**Total Score:** ${idea.totalScore}/10\n`;
        report += `**Verdict:** ${idea.verdict}\n\n`;
        
        report += `**Breakdown:**\n`;
        Object.entries(idea.scores || {}).forEach(([key, val]) => {
          report += `- ${key}: ${val}/10\n`;
        });
        report += `\n`;
        
        if (idea.description) {
          report += `**Description:** ${idea.description}\n\n`;
        }
        report += `---\n\n`;
      });

      // Top recommendation
      const winner = scored[0];
      report += `## 🎯 RECOMMENDATION\n\n`;
      report += `**WINNER:** ${winner.title || 'Top Idea'}\n\n`;
      report += `**Why this won:**\n`;
      report += `- Highest total score (${winner.totalScore}/10)\n`;
      report += `- Strong across all criteria\n`;
      report += `- ${winner.verdict === 'IMPLEMENT' ? 'Clear winner - implement today!' : 'Good candidate - consider implementing'}\n\n`;

      report += `## ✅ ACTION PLAN\n\n`;
      report += `### Option 1: Auto-Implement (Score 8.5+)\n`;
      report += `If top score >= 8.5:\n`;
      report += `- [ ] RITA approves auto-implementation\n`;
      report += `- [ ] Create implementation plan\n`;
      report += `- [ ] Execute today\n`;
      report += `- [ ] Publish/deploy result\n\n`;

      report += `### Option 2: Earth Decision (Score 7-8.4)\n`;
      report += `If top score 7-8.4:\n`;
      report += `- [ ] Present top 3 ideas to Earth\n`;
      report += `- [ ] Earth selects preferred idea\n`;
      report += `- [ ] RITA implements chosen idea\n`;
      report += `- [ ] Publish/deploy result\n\n`;

      report += `### Option 3: Iterate (Score < 7)\n`;
      report += `If all scores < 7:\n`;
      report += `- [ ] Adjust agent prompts\n`;
      report += `- [ ] Re-run swarm\n`;
      report += `- [ ] Or wait for tomorrow\'s swarm\n\n`;
    } else {
      report += `\n## ⏳ Waiting for Agent Responses\n\n`;
      report += `No ideas to evaluate yet.\n\n`;
      report += `**To complete evaluation:**\n`;
      report += `1. Run \`node src/spawn-agents.js\`\n`;
      report += `2. Spawn each agent using sessions_spawn\n`;
      report += `3. Save responses to \`results/responses/\`\n`;
      report += `4. Run \`node src/evaluator.js\`\n\n`;
    }

    report += `---\n\n`;
    report += `💙 *RITA's Agent Swarm Evaluation System* 🦋\n`;

    // Save report
    const reportPath = join(this.resultsDir, `evaluation-${this.date}.md`);
    writeFileSync(reportPath, report);

    console.log(`\n📄 Evaluation report saved: ${reportPath}`);
    
    if (collectedIdeas.length > 0) {
      console.log('\n🏆 TOP IDEA:');
      console.log(`   ${collectedIdeas[0].title || 'N/A'}`);
      console.log(`   Score: ${collectedIdeas[0].score || 'N/A'}/10`);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const evaluator = new IdeaEvaluator();
  evaluator.generateReport();
}

export default IdeaEvaluator;