export function canReadMemo(session, review = false) {
  return session.mode === 'training' || review || session.finishedAt != null;
}

export function memoLink(question, session, review = false) {
  if (!canReadMemo(session, review)) return '';
  return `<p class="memo-help"><a href="memo.html?id=${encodeURIComponent(question.memoId)}" target="_blank" rel="noopener">Fiche mémo de révision ↗</a></p>`;
}
