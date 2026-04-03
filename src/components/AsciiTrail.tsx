import { useEffect, useRef } from "react";

const CHARS = "·.,:;+*#@$!?░▒/\\|^~`";
const CELL_SIZE = 20;
const RADIUS = 69;
const DECAY = 0.025;
const BOOST_MAX = 0.35;
const CHAR_CHANGE_CHANCE = 0.08;

interface Cell {
  char: string;
  opacity: number;
}

const AUTO_SPEED = 2.5;
const AUTO_ANGLE_DRIFT = 0.12;

const AsciiTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let cols = 0;
    let rows = 0;
    let cells: Cell[][] = [];

    // Auto-wander state
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let useAuto = isTouch;
    let autoX = window.innerWidth / 2;
    let autoY = window.innerHeight / 2;
    let autoAngle = Math.random() * Math.PI * 2;
    let mouseIdleTimer: ReturnType<typeof setTimeout> | null = null;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / CELL_SIZE) + 1;
      rows = Math.ceil(canvas.height / CELL_SIZE) + 1;
      cells = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          opacity: 0,
        })),
      );
    };

    const activateCells = (x: number, y: number) => {
      const centerCol = x / CELL_SIZE;
      const centerRow = y / CELL_SIZE;
      const radiusCells = Math.ceil(RADIUS / CELL_SIZE);

      for (
        let r = Math.floor(centerRow - radiusCells);
        r <= Math.ceil(centerRow + radiusCells);
        r++
      ) {
        for (
          let c = Math.floor(centerCol - radiusCells);
          c <= Math.ceil(centerCol + radiusCells);
          c++
        ) {
          if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
          const dx = (c + 0.5) * CELL_SIZE - x;
          const dy = (r + 0.5) * CELL_SIZE - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < RADIUS) {
            const factor = (1 - dist / RADIUS) ** 1.5;
            cells[r][c].opacity = Math.min(
              1,
              cells[r][c].opacity + factor * BOOST_MAX,
            );
            if (Math.random() < CHAR_CHANGE_CHANCE) {
              cells[r][c].char =
                CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      useAuto = false;
      if (mouseIdleTimer) clearTimeout(mouseIdleTimer);
      mouseIdleTimer = setTimeout(() => {
        useAuto = true;
      }, 3000);
      activateCells(e.clientX, e.clientY);
    };

    const stepAuto = () => {
      autoAngle += (Math.random() - 0.5) * AUTO_ANGLE_DRIFT * 2;
      autoX += Math.cos(autoAngle) * AUTO_SPEED;
      autoY += Math.sin(autoAngle) * AUTO_SPEED;

      // Bounce off edges with margin
      const margin = RADIUS;
      if (autoX < margin) {
        autoX = margin;
        autoAngle = Math.PI - autoAngle;
      }
      if (autoX > canvas.width - margin) {
        autoX = canvas.width - margin;
        autoAngle = Math.PI - autoAngle;
      }
      if (autoY < margin) {
        autoY = margin;
        autoAngle = -autoAngle;
      }
      if (autoY > canvas.height - margin) {
        autoY = canvas.height - margin;
        autoAngle = -autoAngle;
      }

      activateCells(autoX, autoY);
    };

    const draw = () => {
      if (useAuto) stepAuto();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${Math.round(CELL_SIZE * 0.65)}px 'Courier New', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#e0e0e0";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = cells[r][c];
          if (cell.opacity < 0.01) continue;
          ctx.globalAlpha = cell.opacity;
          ctx.fillText(cell.char, (c + 0.5) * CELL_SIZE, (r + 0.5) * CELL_SIZE);
          cell.opacity = Math.max(0, cell.opacity - DECAY);
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    init();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", onMouseMove);
    draw();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMouseMove);
      if (mouseIdleTimer) clearTimeout(mouseIdleTimer);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default AsciiTrail;
