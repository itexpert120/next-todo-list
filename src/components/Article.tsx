import Image from "next/image";

interface TaskProps {
  title: string;
  body: string;
  onDelete: () => void; // Function to handle delete
  timeAdded: string;
}

export function Article(props: TaskProps) {
  const handleDelete = () => {
    props.onDelete();
  };
  return (
    <>
      <div className="border rounded-lg p-4 shadow-sm">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold text-lg">{props.title}</h1>
          <button type="button" onClick={handleDelete}>
            <Image
              src="/checkbox-check.svg"
              width="24"
              height="24"
              alt="trash"
            />
          </button>
        </div>
        <div className="flex flex-row justify-between items-center mt-2">
          <p className="my-1">{props.body}</p>
          <p className="font-bold text-sm my-1">
            Added:{" "}
            <span className="font-normal text-gray-500">{props.timeAdded}</span>
          </p>
        </div>
      </div>
    </>
  );
}
