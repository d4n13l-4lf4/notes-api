import * as Joi from '@hapi/joi';

const NotesSchema = Joi.object().keys({
  description: Joi.string().required().max(40, 'utf-8')
});


export default NotesSchema;
