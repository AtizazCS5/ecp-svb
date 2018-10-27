'use strict';
/*
  Write your transaction processor functions here
 */

/*
  Sample transaction
  @param {org.ecp.voting.vote} vote
  @transaction
 */
function vote(tx) {
    if (!tx.ifVotedAsset.votedOrNot) {
        tx.candidateVoteAsset.totalVote = tx.candidateVoteAsset.totalVote + 1;
        return getAssetRegistry('org.ecp.voting.candidateVote')
            .then(function (assetRegistry) {
                return assetRegistry.update(tx.candidateVoteAsset);
            })
            .then(function () {
                return getAssetRegistry('org.ecp.voting.ifVoted')
                    .then(function (assetRegistry) {
                        tx.ifVotedAsset.votedOrNot = true;
                        return assetRegistry.update(tx.ifVotedAsset);
                    })
            });
    } else {
        throw new Error('Vote already submitted!');
    }
}