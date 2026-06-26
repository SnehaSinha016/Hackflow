import { FolderTree, Folder, FileText } from "lucide-react";

const FolderStructure = ({ folders }) => {

  if (!folders || folders.length === 0) {
    return null;
  }

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <FolderTree
          className="text-violet-600"
          size={24}
        />

        <h2 className="text-2xl font-bold">
          Folder Structure
        </h2>

      </div>

      <div className="space-y-6">

        {folders.map((folder, index) => (

          <div
            key={index}
            className="border rounded-xl p-5 hover:shadow-md transition"
          >

            {/* Folder Name */}

            <div className="flex items-center gap-3">

              <Folder
                className="text-yellow-500"
                size={22}
              />

              <h3 className="text-lg font-semibold text-slate-800">
                {folder.folder}
              </h3>

            </div>

            {/* Purpose */}

            {folder.purpose && (

              <p className="text-gray-600 mt-3 ml-9 leading-7">
                {folder.purpose}
              </p>

            )}

            {/* Files */}

            {folder.files?.length > 0 && (

              <div className="mt-5 ml-9">

                <h4 className="font-semibold text-violet-700 mb-3">
                  Files
                </h4>

                <div className="space-y-2">

                  {folder.files.map((file, i) => {

                    const fileName =
                      typeof file === "string"
                        ? file
                        : file.name;

                    const description =
                      typeof file === "string"
                        ? ""
                        : file.description;

                    return (

                      <div
                        key={i}
                        className="flex items-start gap-3 bg-gray-50 rounded-lg p-3"
                      >

                        <FileText
                          className="text-violet-600 mt-1"
                          size={18}
                        />

                        <div>

                          <p className="font-medium">
                            {fileName}
                          </p>

                          {description && (

                            <p className="text-gray-500 text-sm mt-1">
                              {description}
                            </p>

                          )}

                        </div>

                      </div>

                    );

                  })}

                </div>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  );

};

export default FolderStructure;