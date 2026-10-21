/**
 * Stack rows stagger and reveal is handled directly by SkillsSection with
 * IntersectionObserver and hardware-accelerated CSS transitions.
 * This prevents offscreen animation execution and eliminates flashes of invisible or 0.35 opacity content.
 */
export function initStackStagger(_root: HTMLElement | Document = document) {
  // Coordinated in SkillsSection
}
