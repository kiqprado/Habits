interface IDeleteActivityEmojiModal {
  HandleDeleteActivityEmoji: () => void
  ToggleActivityDeleteEmojiModal: () => void
}

export function DeleteActivityEmojiModal({
  HandleDeleteActivityEmoji,
  ToggleActivityDeleteEmojiModal
} : IDeleteActivityEmojiModal ) {
  
  return (
    <div className='fixed inset-0 flex bg-neutral-950/50'>
      <div className='m-auto flex flex-col items-center gap-3 px-3 py-1.5 rounded-xl bg-neutral-700'>
        <span className='text-purple-300 font-bold'>Deseja excluir a atividade?</span>
        <div className='flex items-center gap-3'>
          <button
            onClick={HandleDeleteActivityEmoji}
            className='flex items-center gap-2 px-3 py-1.5 font-bold border rounded-xl border-purple-600 hover:border-purple-400 text-purple-400 hover:text-purple-200'
          >
            Confirmar
          </button>
          <button
            onClick={ToggleActivityDeleteEmojiModal}
            className='flex items-center gap-2 px-3 py-1.5 font-bold border rounded-xl border-purple-600 hover:border-purple-400 text-purple-400 hover:text-purple-200'
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}