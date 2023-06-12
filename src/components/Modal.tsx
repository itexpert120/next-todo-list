interface ModalProps {
  showModal: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  summary: string;
  setSummary: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Modal(props: ModalProps) {
  return (
    <>
      {props.showModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="mx-4 w-[500px] flex flex-col">
            <div className="bg-white p-2 rounded-lg">
              <div className="p-6 text-left">
                <h3 className="mb-4 text-xl font-medium text-gray-900">
                  Add New Task
                </h3>
                <form className="space-y-6" onSubmit={props.handleSubmit}>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Title<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={props.title}
                      onChange={(e) => props.setTitle(e.target.value)}
                      className="bg-gray-50 border border-gay-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="summary"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Summary
                    </label>
                    <input
                      type="text"
                      name="summary"
                      id="summary"
                      value={props.summary}
                      onChange={(e) => props.setSummary(e.target.value)}
                      className="bg-gray-50 border border-gay-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="text-sky-400 text-sm hover:bg-sky-100 rounded-lg w-[125px] py-2 my-2"
                      onClick={() => props.setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-white text-sm bg-sky-500 hover:bg-sky-600 rounded-lg  w-[125px] py-2 my-2"
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
