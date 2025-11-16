// quanod pagina estiver carregando informações

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <p className="text-gray-600 font-medium">Carregando...</p>
      </div>
    </div>
  );
};