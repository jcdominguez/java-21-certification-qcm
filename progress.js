// Une question est traitée après validation, ou après remise d’une réponse en fin de session.
export function treatedQuestionIds(session) {
  if (!session) return [];
  const submitted = session.finishedAt === null ? [] : session.ids.filter(id => session.answers[id]?.length);
  return [...new Set([...session.validated, ...submitted])];
}

// Les anciens bilans sont bornés à trente ; le nouveau suivi reste indépendant de cette limite.
export function restoreTreated(saved, questionIds) {
  const known = new Set(questionIds);
  if (saved.treated !== undefined) {
    if (!Array.isArray(saved.treated) || !saved.treated.every(id => known.has(id))) {
      throw new Error('Suivi des questions traitées invalide');
    }
    return [...new Set(saved.treated)];
  }
  return [...new Set([
    ...saved.history.flatMap(treatedQuestionIds),
    ...treatedQuestionIds(saved.session),
    ...saved.errors
  ])].filter(id => known.has(id));
}
