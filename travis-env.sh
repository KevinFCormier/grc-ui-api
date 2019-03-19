# Licensed Materials - Property of IBM 
# Copyright IBM Corporation 2018. All Rights Reserved. 
# Note to U.S. Government Users Restricted Rights: 
# Use, duplication or disclosure restricted by GSA ADP Schedule 
# Contract with IBM Corp. 

# Release Tag
if [ "$TRAVIS_BRANCH" = "master" ]; then
    RELEASE_TAG=latest
else
    RELEASE_TAG="${TRAVIS_BRANCH#release-}-latest"
fi
if [ "$TRAVIS_TAG" != "" ]; then
    RELEASE_TAG="${TRAVIS_TAG#v}"
fi
export RELEASE_TAG="$RELEASE_TAG"

# Release Tag
echo TRAVIS_EVENT_TYPE=$TRAVIS_EVENT_TYPE
echo TRAVIS_BRANCH=$TRAVIS_BRANCH
echo TRAVIS_TAG=$TRAVIS_TAG
echo RELEASE_TAG="$RELEASE_TAG"
