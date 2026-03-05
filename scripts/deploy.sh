#!/bin/bash
set -e

SLUG="advanced-vs-plus"
SRC="deploy"
DIST="dist"

echo "Building $SLUG..."

rm -rf "$DIST"
mkdir -p "$DIST"

rsync -a --exclude='client/' "$SRC/" "$DIST/"

echo "Deploy contents:"
find "$DIST" -type f | sort
echo ""

echo "Deploying to $SLUG.quick.shopify.io..."
quick deploy "$DIST" "$SLUG"

echo "Done — https://$SLUG.quick.shopify.io"
