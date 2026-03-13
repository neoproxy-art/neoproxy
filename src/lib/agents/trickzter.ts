/**
 * Agent: Trickzter (Mutation/Chaos Engine)
 * Responsibilities: Proposing new generative parameters, aesthetic semi-randomization.
 */

export const Trickzter = {
  proposeMutation: (baseStyle = 'metatron', parentParams: any = null) => {
    const seeds = {
      gyroid: { scale: [2, 5], complexity: [0.5, 0.9] },
      metatron: { scale: [1, 3], complexity: [0.7, 1.2] },
      fractal: { scale: [5, 15], complexity: [0.9, 1.5] }
    };

    const style = (baseStyle in seeds) ? baseStyle : 'metatron';
    const config = seeds[style as keyof typeof seeds];

    // Inheritance logic: Blend with parent if exists
    let parameters = {
      style,
      seed: Math.floor(Math.random() * 1000000),
      scale: +(Math.random() * (config.scale[1] - config.scale[0]) + config.scale[0]).toFixed(2),
      complexity: +(Math.random() * (config.complexity[1] - config.complexity[0]) + config.complexity[0]).toFixed(2),
      mutation_depth: (parentParams?.mutation_depth || 0) + 1,
      aesthetic_bias: parentParams?.aesthetic_bias || 'cyberpunk_blue'
    };

    if (parentParams) {
      // 50% Inheritance blend
      parameters.scale = +((parameters.scale + parentParams.scale) / 2).toFixed(2);
      parameters.complexity = +((parameters.complexity + parentParams.complexity) / 2).toFixed(2);
    }

    return parameters;
  }
};
