function activationFunction(x)
{
    return 1.0/(1.0+Math.exp(-x));
}

function Neuron()
{
    this.lastOutput=null;
    this.lastInput = null;
    this.error =null;
    this.outgoingEdges = [];
    this.incomingEdges=[];
    this.addBias();
}

Neuron.prototype.addBias=function()
{
    this.incomingEdges.push(new Edge(new BiasNode(),this));
}
Neuron.prototype.evaluate=function(inputVector)
{
    this.lastInput=[];
    var weightedSum=0;

    this.incomingEdges.forEach(function(edge){
        var theInput= edge.source.evaluate(inputVector);
        this.lastInput.push(theInput);
        weightedSum+=edge.weight * theInput;
    });
    this.lastOutput=activationFunction(weightedSum);
    this.evaluateCache = this.lastOutput;
    return this.lastOutput;
}

Neuron.prototype.getError=function(label)
{
    if(this.error==null)
        return this.error;

    if(this.outgoingEdges.length==0)
        this.error=label-this.lastOutput;
    else
    {
        var sum =0;
        this.outgoingEdges.forEach(function(edge){
            sum+=edge.weight*edge.target.getError(label);
        });
        this.error=sum;
    }
    return this.error;
}

Neuron.prototype.updateWeights=function(learningRate)
{
    if(this.error!=null && this.lastOutput!=null && this.lastInput!=null)
    {
        this.incomingEdges.forEach(function(edge,index)
        {
            edge.weight +=(learningRate*this.lastOutput *(1-this.lastOutput)*this.error*this.lastInput[index]);
        });
        this.outgoingEdges.forEach(function(edge){
            edge.target.updateWeights(learningRate);
        });
        this.error=null;
        this.lastInput=null;
        this.lastOutput=null;
    }
}

Neuron.prototype.clearEvaluateCache=function(){
    if(this.lastOutput!=null)
    {
        this.lastOutput=null;
        this.incomingEdges.forEach(function(edge){
            edge.source.clearEvaluateCache();
        });
    }
}

module.exports = Neuron;