const promptTechniques = [
    {
      key: 'chainOfThought',
      name: 'Chain of Thought',
      example: 'Make my prompt more logical',
      description: 'Encourages the model to reason step-by-step before answering, improving logic and accuracy.'
    },
    {
      key: 'rolePlay',
      name: 'Role Prompting',
      example: 'Make it sound like an expert',
      description: 'Assigns a role or persona (e.g., lawyer, teacher, chef) to guide the tone, vocabulary, and expertise of the response.'
    },
    {
      key: 'instructional',
      name: 'Instructional',
      example: 'Make it more instructive',
      description: 'Directs the model to explain something clearly, often with step-by-step instructions or educational language.'
    },
    {
      key: 'reflexion',
      name: 'Reflexion',
      example: 'Ask the model to double-check its answer',
      description: 'Prompts the model to reflect on and verify its initial output, reducing errors and improving reliability.'
    },
    {
      key: 'fewShot',
      name: 'Few-Shot',
      example: 'Add examples to guide the output.',
      description: 'Provides a few sample inputs and outputs to demonstrate the format or expected response pattern.'
    }
  ];
  

export default promptTechniques;

