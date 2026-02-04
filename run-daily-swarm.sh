#!/bin/bash
# Daily Agent Swarm - Cron Script
# Runs every day at 9:00 AM UTC to spawn idea agents

SWARM_DIR="/root/.openclaw/workspace/daily-agent-swarm"
LOG_FILE="$SWARM_DIR/logs/swarm-$(date +%Y-%m-%d).log"
DATE=$(date +%Y-%m-%d)

echo "========================================" >> "$LOG_FILE"
echo "🦋 DAILY AGENT SWARM - $DATE" >> "$LOG_FILE"
echo "Started: $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

cd "$SWARM_DIR"

# Step 1: Generate agent tasks
echo "[$(date)] Generating agent tasks..." >> "$LOG_FILE"
node src/spawn-agents.js >> "$LOG_FILE" 2>&1

# Step 2: Create evaluation template
echo "[$(date)] Creating evaluation template..." >> "$LOG_FILE"
node src/evaluator.js >> "$LOG_FILE" 2>&1

# Step 3: Log completion
echo "[$(date)] Agent swarm tasks generated!" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
echo "📋 NEXT STEPS:" >> "$LOG_FILE"
echo "   1. RITA reviews agent assignments" >> "$LOG_FILE"
echo "   2. Spawn sub-agents using sessions_spawn" >> "$LOG_FILE"
echo "   3. Collect and evaluate responses" >> "$LOG_FILE"
echo "   4. Implement best idea" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Optional: Send notification (if configured)
# curl -X POST ... (could send to Telegram, etc.)

echo "[$(date)] Daily swarm complete!" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"