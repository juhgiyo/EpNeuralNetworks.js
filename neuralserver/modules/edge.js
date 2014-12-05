function Edge(source,target)
{
    this.weight = Math.random();
    this.source= source;
    this.target= target;
    source.outgoingEdges.push(this);
    target.incomingEdges.push(this);
}



module.exports = Edge;