var Neuron = require('neuron');

function BiasNeuron()
{
}
BiasNeuron.prototype=new Neuron();

BiasNeuron.prototype.evaluate=function(inputVector)
{
   return 1.0;
}

module.exports = BiasNeuron;