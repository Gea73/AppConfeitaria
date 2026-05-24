export function firebaseErrorMessage(code: string): string {
  const errors: Record<string, string> = {
    'auth/invalid-credential':   'E-mail ou senha incorretos.',
    'auth/user-not-found':       'Usuário não encontrado. Faça seu cadastro.',
    'auth/wrong-password':       'Senha incorreta.',
    'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
    'auth/invalid-email':        'E-mail inválido.',
    'auth/too-many-requests':    'Muitas tentativas. Tente novamente mais tarde.',
    'auth/network-request-failed': 'Sem conexão. Verifique sua internet.',
  };

  return errors[code] ?? 'Ocorreu um erro. Tente novamente.';
}