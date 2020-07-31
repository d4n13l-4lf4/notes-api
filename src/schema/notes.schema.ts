import * as Joi from '@hapi/joi';

const NotesSchema = Joi.object().keys({
  id: Joi.number().positive(),
  description: Joi.string().required()
});


export default NotesSchema;
