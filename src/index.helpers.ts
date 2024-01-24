import { NewProject, Project, UpdateParameters } from "./model";
import { get, post, put } from "./service";

export const getMostRecentProject = async (
  projectId: string,
): Promise<Project | undefined> => {
  const result: Project = await get<Project>(`/projects/id:${projectId}`);
  const mostRecentProject: Project | undefined = result.projects.project
    .filter((p) => {
      return p.name.startsWith("v") && !p.name.includes("-");
    })
    .pop(); // the last item in this array is _usually_ the most recent one.

  return mostRecentProject;
};

export const createNewProject = async (
  projectName: string,
  projectParentId: string,
  projectSourceId: string,
): Promise<Project | undefined> => {
  const newProjectId: string = projectParentId
    .concat("_")
    .concat(projectName.split(".").join(""));

  const newProject: NewProject = {
    id: newProjectId,
    parentProject: {
      locator: projectParentId,
    },
    sourceProject: {
      locator: projectSourceId,
    },
    name: projectName,
    copyAllAssociatedSettings: "true",
  };

  const createResult: Project | undefined = await post<Project>(
    "/projects",
    JSON.stringify(newProject),
  ).then((result) => {
    if (result) {
      return result;
    }
    return undefined;
  });

  return createResult;
};

export const updateProjectParameters = async (
  projectId: string,
  paramsToUpdate: UpdateParameters,
) => {
  for (const param of paramsToUpdate.parameters) {
    const updatePath = `/projects/id:${projectId}/parameters/${param.name}`;
    console.log(`Updating ${param.name} to ${param.value}`);

    await put(updatePath, `${param.value}`, "text/plain");
  }
};
