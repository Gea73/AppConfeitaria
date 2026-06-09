export function firebaseErrorMessage(code: string): string {
  const errors: Record<string, string> = {
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/user-not-found': 'Usuário não encontrado. Faça seu cadastro.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    'auth/network-request-failed': 'Sem conexão. Verifique sua internet.',
    'auth/password-does-not-meet-requirements': 'Senha deve conter letras,números e caracteres especiais',

    // Account state
    'auth/user-disabled': 'Esta conta foi desativada.',
    'auth/account-exists-with-different-credential': 'Já existe uma conta com este e-mail.',

    // Session / token
    'auth/expired-action-code': 'Este link expirou. Solicite um novo.',
    'auth/invalid-action-code': 'Link inválido ou já utilizado.',
    'auth/session-cookie-expired': 'Sessão expirada. Faça login novamente.',
    'auth/id-token-expired': 'Sessão expirada. Faça login novamente.',
    'auth/id-token-revoked': 'Sessão revogada. Faça login novamente.',

    // Weak password
    'auth/weak-password': 'Senha fraca. Use pelo menos 6 caracteres.',

    // Requires recent login
    'auth/requires-recent-login': 'Por segurança, faça login novamente para continuar.',

    // Popup / redirect (Google, Facebook etc.)
    'auth/popup-closed-by-user': 'Login cancelado. A janela foi fechada.',
    'auth/popup-blocked': 'Popup bloqueado pelo navegador. Permita popups e tente novamente.',
    'auth/cancelled-popup-request': 'Requisição de login cancelada.',
    'auth/unauthorized-domain': 'Domínio não autorizado para autenticação.',

    // Phone auth
    'auth/invalid-phone-number': 'Número de telefone inválido.',
    'auth/missing-phone-number': 'Informe o número de telefone.',
    'auth/quota-exceeded': 'Limite de SMS atingido. Tente mais tarde.',
    'auth/invalid-verification-code': 'Código de verificação inválido.',
    'auth/invalid-verification-id': 'ID de verificação inválido.',
    'auth/missing-verification-code': 'Informe o código de verificação.',

    // Generic
    'auth/operation-not-allowed': 'Este método de login não está habilitado.',
    'auth/internal-error': 'Erro interno. Tente novamente.',
    'auth/missing-email': 'Informe o e-mail.',
    'auth/missing-password': 'Informe a senha.',
  };

  return errors[code] ?? 'Ocorreu um erro. Tente novamente.';
}