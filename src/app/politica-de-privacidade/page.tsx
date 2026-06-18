import Link from "next/link";

export default function PoliticaPrivacidade() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 p-6 md:p-12 max-w-3xl mx-auto">
      <Link href="/" className="text-orange-500 hover:underline text-sm mb-6 inline-block">
        ← Voltar para o App
      </Link>
      <h1 className="text-3xl font-bold text-white mb-6">Política de Privacidade</h1>
      <p className="mb-4">A sua privacidade é importante para nós. É política do Qual o Tom App respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site qualotom.com.br.</p>

      <h2 className="text-xl font-semibold text-white mt-6 mb-3">1. Coleta de Informações</h2>
      <p className="mb-4">Operamos como uma ferramenta utilitária e não coletamos dados de login ou informações pessoais identificáveis. No entanto, utilizamos serviços de terceiros, como o Google AdSense e Vercel Analytics, que podem coletar dados técnicos de navegação e cookies de forma anônima.</p>

      <h2 className="text-xl font-semibold text-white mt-6 mb-3">2. Cookies e Anúncios (Google AdSense)</h2>
      <p className="mb-4">O Google, como fornecedor de terceiros, utiliza cookies para exibir anúncios no nosso site. Com o cookie DART, o Google pode exibir anúncios com base nas visitas que o usuário fez a este e a outros sites na Internet. Os usuários podem desativar o cookie DART visitando a Política de Privacidade da rede de conteúdo e anúncios do Google.</p>

      <h2 className="text-xl font-semibold text-white mt-6 mb-3">3. Links para Sites de Terceiros</h2>
      <p className="mb-4">O nosso site pode ter links para sites externos que não são operados por nós. Não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas.</p>

      <p className="text-xs text-zinc-500 mt-12">Esta política é válida a partir de Junho de 2026.</p>
    </main>
  );
}
