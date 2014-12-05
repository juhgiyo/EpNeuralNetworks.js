function Network()
{
    this.inputNodes=[];
    this.outputNode=null;
}

Network.prototype.evaluate= function(inputVector)
{
    // assert(this.inputNodes.length<inputVector.length)
    this.outputNode.clearEvaluateCache();
    return this.outputNode.evaluate(inputVector);
}

Network.prototype.propagateError=function(label)
{
    this.inputNodes.forEach(function(node){
        node.getError(label);
    });
}

Network.prototype.updateWeights=function(learningRate)
{
    this.inputNodes.forEach(function(node){
        node.updateWeights(learningRate);
    });
}

Network.prototype.train= function(labeledExamples, learningRate,maxIterations)
{
    learningRate = typeof learningRate !== 'undefined'? learningRate : 0.9;
    maxIterations= typeof maxIterations !== 'undefined'? maxIterations : 10000;

    while(maxIterations>0)
    {
        labeledExamples.forEach(function(input){
           var output = this.evaluate(input.example);
            this.propagateError(input.label);
            this.updateWeights(learningRate);
        });
        maxIterations-=1;
    }
}
module.exports = Network;