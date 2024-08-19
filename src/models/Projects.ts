import { Schema, model } from 'mongoose'

const ProjectsSchema = new Schema({
  projectPicture: {
    type: Schema.Types.String,
    required: true
  },
  projectDate: {
    type: Schema.Types.String,
    required: true
  },
  projectTitle: {
    type: Schema.Types.String,
    required: true
  },
  projectDetails: {
    type: Schema.Types.String,
    required: true
  },
  projectLink: {
    type: Schema.Types.String,
    required: true
  },
  projectTags: {
    type: Schema.Types.String,
    required: true
  }
})

export const ProjectsModel = model('Projects', ProjectsSchema)