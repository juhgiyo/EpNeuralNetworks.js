var Neuron = require('neuron');

function InputNeuron(index)
{
   this.index= index;
}
InputNeuron.prototype=new Neuron();

InputNeuron.prototype.evaluate=function(inputVector)
{
    this.lastOutput=inputVector[this.index];
    return this.lastOutput;
}

InputNeuron.prototype.updateWeights=function(learningRate)
{
    this.outgoingEdges.forEach(function(edge){
        edge.target.updateWeights(learningRate);
    });
}

InputNeuron.prototype.getError=function(label)
{
    this.outgoingEdges.forEach(function(edge){
        edge.target.getError(label);
    });
}

InputNeuron.prototype.addBias=function()
{
    return;
}

InputNeuron.prototype.clearEvaluateCache=function()
{
    this.lastOutput=null;
}
module.exports = InputNeuron;