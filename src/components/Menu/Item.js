import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

const Item = props => {
  const { theme, item: { label, to} = {}, onClick, external } = props;

  let linky;
  if (!external) {
    linky = <Link to={to} className={"hiddenItem" in props ? "inHiddenItem" : ""}onClick={onClick}data-slug={to}>{label}</Link>
  }
  else {
    linky = <a href={to}>{label}</a>
  }
  return (
    <React.Fragment>
      <li className={"hiddenItem" in props ? "hiddenItem" : "item"} key={label}>
        {linky}
      </li>

      {/* --- STYLES --- */}
      <style jsx>{`
        .item,
        .showItem, .hideItem {
          background: transparent;
          transition: all ${theme.time.duration.default};
          display: flex;
          align-items: center;

          :global(a) {
            padding: ${theme.space.inset.s};
            display: flex;
            align-items: center;
          }

          :global(svg) {
            margin: 0 ${theme.space.inset.xs} 0 0;
            opacity: 0.3;
          }
        }

        @from-width desktop {
          .item {
            :global(a) {
            text-shadow:
              -1px -1px 2px  ${theme.hero.backgroundColor}, 
              1px -1px 2px ${theme.hero.backgroundColor},
              -1px 1px 2px  ${theme.hero.backgroundColor},
              1px 1px 2px  ${theme.hero.backgroundColor};

              color: ${theme.color.neutral.white};
              padding: ${theme.space.inset.s};
              transition: all ${theme.time.duration.default};
              border-radius: ${theme.size.radius.small};
            }

            :global(.homepage):not(.fixed) & :global(a) {
              color: ${theme.color.neutral.white};
            }

            :global(a:hover) {
              color: ${theme.color.neutral.white};
              background: color(white alpha(-60%));
            }

            :global(svg) {
              transition: all ${theme.time.duration.default};
            }

            &:hover :global(svg) {
              fill: ${theme.color.brand.primary};
              opacity: 1;

              :global(.hero) & :global(svg) {
                fill: green;
              }
            }
          }

          .showItem {
            display: none;
          }

          .hiddenItem {
            text-align: left;
            padding: 0;

            & :global(a.inHiddenItem) {
              color: ${theme.text.color.primary};
              padding: 0.8em 20px;
              width: 100%;
              text-shadow: none;
              display: block;
              &:hover {
                background-color: #f2f2f2;
                color: ${theme.color.brand.primary};
              }
            }
          }
          :global(.itemList .hideItem) {
            display: none;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Item.propTypes = {
  item: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.func,
  theme: PropTypes.object.isRequired,
  external: PropTypes.bool
};

export default Item;
