import * as Accordion from '@radix-ui/react-accordion'
import { toggleOffItem, toggleOnAttributeKey } from 'lib/router'
import { useRouter } from 'next/router'
import { FC } from 'react'
import AttributeSelector from './filter/AttributeSelector'
import { SWRResponse } from 'swr'
import { SWRInfiniteResponse } from 'swr/infinite/dist/infinite'
import { FiChevronDown } from 'react-icons/fi'
import { paths } from '@reservoir0x/reservoir-kit-client'

type Props = {
  attributes: SWRResponse<
    paths['/collections/{collection}/attributes/all/v1']['get']['responses']['200']['schema']
  >
  setTokensSize: SWRInfiniteResponse['setSize']
}

const Sidebar: FC<Props> = ({ attributes, setTokensSize }) => {
  const router = useRouter()

  return (
    <Accordion.Root
    //---------This is the Parent container for all attribute search items
      type="multiple"
      className="collectionTabContent"
    >
      <div className="attributeButton">
        <button
          onClick={() => {
            router.query?.attribute_key === ''
              ? toggleOffItem(router, 'attribute_key')
              : toggleOnAttributeKey(router, 'attribute_key', '')
          }}
          className={`reservoir-label-l w-full border-b-[1px] border-gray-300 px-6 py-5 text-left transition dark:border-neutral-600 dark:text-white ${
            router.query.attribute_key &&
            router.query.attribute_key.toString() === ''
              ? 'bg-primary-100 hover:bg-primary-300 dark:hover:bg-primary-900'
              : 'hover:bg-primary-100 dark:hover:bg-primary-900'
          }`}
        >
          Explore All
        </button>
      </div>
      {attributes.data?.attributes?.map((attribute) => (
        <Accordion.Item
          value={`item-${attribute.key}`}
          key={attribute.key}
          className="attributeButton"
        >
          <Accordion.Header
          //------This is the Attribute Parent Button
            className={`attributeButton ${
              router.query.attribute_key &&
              router.query.attribute_key.toString() === attribute.key
                ? 'divide-gray-800 dark:divide-gray-300'
                : 'divide-gray-300 dark:divide-gray-800'
            }`}
          >
            <button
              onClick={() => {
                if (attribute.key) {
                  router.query?.attribute_key === attribute.key
                    ? toggleOffItem(router, 'attribute_key')
                    : toggleOnAttributeKey(
                        router,
                        'attribute_key',
                        attribute.key
                      )
                }
              }}
              //------This is the attribute Text div
              className={`attributeButtonInner ${
                router.query.attribute_key &&
                router.query.attribute_key.toString() === attribute.key
                  ? 'bg-primary-100 hover:bg-primary-300  dark:bg-primary-900 dark:hover:bg-primary-900'
                  : 'hover:bg-primary-100 dark:hover:bg-primary-900'
              }`}
            >
              {attribute.key}
            </button>
            <div
            //----This is the arrow of the drop down
              className={`flex items-center ${
                router.query.attribute_key &&
                router.query.attribute_key.toString() === attribute.key
                  ? 'attributeButtonInners2'
                  : 'attributeButtonInners1'
              }`}
            >
              {/* <div className="h-6 w-px bg-gray-300 dark:bg-neutral-600"></div> */}
              <Accordion.Trigger className="attributeFilterParent">
                <FiChevronDown className="h-5 w-5" aria-hidden />
              </Accordion.Trigger>
            </div>
          </Accordion.Header>
          <Accordion.Content>
            <AttributeSelector
              attribute={attribute}
              setTokensSize={setTokensSize}
            />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export default Sidebar
