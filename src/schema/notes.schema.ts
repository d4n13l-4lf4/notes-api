import * as Joi from '@hapi/joi';

const NotesSchema = Joi.object().keys({
  description: Joi.string().required()
});


export default NotesSchema;
