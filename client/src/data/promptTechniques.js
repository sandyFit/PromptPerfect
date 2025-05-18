const promptTechniques = [
    {
      key: 'chainOfThought',
      name: 'Chain of Thought (CoT)',
      example: 'Make my prompt more logical',
      description: 'Encourages the model to reason step-by-step before answering, breaking down a complex problem into smaller manegable steps to improve logic and accuracy.'
    },
    {
      key: 'rolePlay',
      name: 'Role Prompting',
      example: 'Make it sound like an expert',
      description: 'Instructs the AI model to adopt a specific role, persona or identity (e.g., lawyer, teacher, helpful assistant, sarcastic critic) to guide the tone, vocabulary, and expertise of the response.'
    },
    {
      key: 'selfVerification',
      name: 'Self Verification',
      example: 'Ask the model to double-check its answer',
      description: 'Expicity prompts the AI model to review, verify or justify its answers, leveraging its ability to self-assess and potentially improve the quality and reliability of its generated content.'
    },
    {
      key: 'fewShot',
      name: 'Few-Shot',
      example: 'Add examples to guide the output.',
      description: 'Provides a few sample inputs and outputs to guide the AI model towards the desired format and style of the response, in addition to the instructions or question.'
    }
  ];
  

export default promptTechniques;

